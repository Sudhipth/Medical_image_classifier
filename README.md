# 🧠 Prediction of Polycystic Ovarian Syndrome using Explainable AI

This project focuses on the **early detection of Polycystic Ovarian Syndrome (PCOS)** in women using **ultrasound images** and **deep learning**, enhanced with **Explainable AI (XAI)** techniques to aid medical professionals with interpretable results.

---

## 📌 Table of Contents
- [Abstract](#abstract)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Explainable AI](#explainable-ai)
- [Results](#results)
- [How to Run](#how-to-run)

---

## 🧬 Abstract

Polycystic Ovarian Syndrome (PCOS) is a prevalent hormonal disorder that affects women in their reproductive age. This project uses **Convolutional Neural Networks (CNN)** to classify **ultrasound images** into *PCOS-infected* and *non-infected* categories. To make the model's decisions transparent, **LIME (Local Interpretable Model-Agnostic Explanations)** is integrated for pixel-level interpretability.

---

## 🛠️ Tech Stack

### 🧠 Machine Learning & AI
- TensorFlow
- Keras
- LIME (Explainable AI)

### 🌐 Web Technologies
- HTML, CSS, JavaScript
- Flask (Backend API)
- Python (Image processing and inference)

### 🗃️ Libraries
- NumPy
- Matplotlib
- scikit-image
- Pillow
- Flask-CORS

---

## 🚀 Features

- Predicts PCOS from ultrasound images with **99.87% accuracy**
- Integrates **Explainable AI** to make predictions interpretable
- Web-based interface for real-time image upload and result display
- Supports medical professionals with trustworthy AI results

---

## 🗂 Dataset

- **Source**: [Kaggle](https://www.kaggle.com/)
- **Classes**: PCOS-infected, Non-infected
- **Total Images**: 3844 ultrasound images
- **Split**: 60% Train, 20% Validation, 20% Test

---

## 🧱 Model Architecture

A custom **CNN model** was built with:
- 6 Convolutional layers
- MaxPooling layers
- Flatten and Dense layers
- Binary output using sigmoid activation

In addition, several pretrained models were compared:
- DenseNet201 (87.88% Accuracy)
- InceptionV3
- VGG19
- MobileNetV2
- ResNet50

Final selected model: **Custom CNN (99.87% Accuracy)**

---

## 🧾 Explainable AI

- **LIME** is used to highlight regions in the ultrasound image that influenced the model’s decision.
- Helps medical professionals **visually verify** and **understand** the prediction.

---

## 📊 Results

| Model              | Accuracy (%) |
|-------------------|--------------|
| Custom CNN         | **99.87**     |
| DenseNet201        | 87.88        |
| Xception           | 68.22        |
| MobileNetV2        | 59.40        |

---

## 🖥️ How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/Sudhipth/Medical_image_classifier.git
   cd Medical_image_classifier
