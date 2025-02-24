from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch

app = Flask(_name_)
CORS(app)  # Enable CORS for all routes

# Load the ViT model and image processor
model_name = "google/vit-base-patch16-224"
processor = ViTImageProcessor.from_pretrained(model_name)
model = ViTForImageClassification.from_pretrained(model_name)
model.eval()  # Set model to evaluation mode

@app.route("/")
def index():
    return (
        "<h1>ViT Classification API</h1>"
        "<p>POST an image to <code>/classify</code> to get the classification label.</p>"
    )

@app.route("/classify", methods=["POST"])
def classify_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        file = request.files["image"]
        image = Image.open(file.stream).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    try:
        # Preprocess image and run inference
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_index = logits.argmax(-1).item()
            predicted_label = model.config.id2label[predicted_index]
    except Exception as e:
        return jsonify({"error": f"Error during classification: {str(e)}"}), 500

    return jsonify({"label": predicted_label})

if _name_ == "_main_":
    app.run(debug=True)