const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const resultText = document.getElementById('result');
const limeImage = document.getElementById('limeImage');
const limeTitle = document.getElementById('limeTitle');
const downloadBtn = document.getElementById('downloadBtn');

imageUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // Reset previous results
    resultText.innerText = '';
    limeImage.style.display = 'none';
    limeTitle.style.display = 'none';
    downloadBtn.style.display = 'none';
  }
});

function predict() {
  const file = imageUpload.files[0];
  if (!file) {
    alert("Please upload an image first!");
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  fetch('http://localhost:5000/predict', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      resultText.innerText = `Prediction: ${data.result}`;
      limeImage.src = `data:image/png;base64,${data.lime}`;
      limeImage.style.display = 'block';
      limeTitle.style.display = 'block';

      // Store for PDF
      window.predictionData = {
        result: data.result,
        limeBase64: data.lime,
        originalImage: imagePreview.src
      };

      downloadBtn.style.display = 'inline-block';
    })
    .catch(err => {
      console.error(err);
      alert("Error predicting image.");
    });
}

function downloadPDF() {
  if (!window.predictionData) return;

  const { result, limeBase64, originalImage } = window.predictionData;

  const pdf = new window.jspdf.jsPDF();
  pdf.setFontSize(16);
  pdf.text("PCOS Prediction Report", 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Prediction: ${result}`, 20, 40);

  // Add original image and LIME image
  pdf.addImage(originalImage, 'JPEG', 20, 50, 70, 70);
  pdf.text("LIME Explanation:", 20, 130);
  pdf.addImage(`data:image/png;base64,${limeBase64}`, 'PNG', 20, 140, 70, 70);

  pdf.save("PCOS_Prediction_Report.pdf");
}
