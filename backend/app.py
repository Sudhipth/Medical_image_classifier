import base64
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify
from flask_cors import CORS
from io import BytesIO
from PIL import Image

from keras.models import load_model
from keras.preprocessing.image import img_to_array
from lime import lime_image
from skimage.segmentation import mark_boundaries

# Load the trained model
model = load_model("pcos_classifier.h5")  # Ensure this file exists

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    image = Image.open(file.stream).convert("RGB")
    image = image.resize((224, 224))
    img_array = img_to_array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    result = "NOT INFECTED" if prediction[0, 0] > 0.5 else "INFECTED"

    # LIME Explanation
    explainer = lime_image.LimeImageExplainer()
    explanation = explainer.explain_instance(
        img_array[0],
        model.predict,
        top_labels=1,
        hide_color=0,
        num_samples=1000
    )
    lime_image_np, mask = explanation.get_image_and_mask(
        explanation.top_labels[0],
        positive_only=False,
        hide_rest=False
    )

    # Save LIME image to bytes
    fig, ax = plt.subplots()
    ax.imshow(mark_boundaries(lime_image_np / 2 + 0.5, mask))
    ax.axis('off')
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    lime_img_bytes = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close(fig)

    return jsonify({"result": result, "lime": lime_img_bytes})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
