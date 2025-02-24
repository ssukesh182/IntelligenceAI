# app_merged.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch
import yt_dlp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the ViT model and image processor (ViT API)
model_name = "google/vit-base-patch16-224"
processor = ViTImageProcessor.from_pretrained(model_name)
model = ViTForImageClassification.from_pretrained(model_name)
model.eval()  # Set model to evaluation mode

@app.route("/")
def index():
    return (
        "<h1>ViT + YouTube Search API</h1>"
        "<p>POST an image to <code>/classify_search</code> to get a classification and related YouTube results.</p>"
    )

@app.route("/classify_search", methods=["POST"])
def classify_search():
    # Check if an image was uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        # Open and process the uploaded image
        file = request.files["image"]
        image = Image.open(file.stream).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    try:
        # Use ViT to classify the image
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_index = logits.argmax(-1).item()
            predicted_label = model.config.id2label[predicted_index]
    except Exception as e:
        return jsonify({"error": f"Error during classification: {str(e)}"}), 500

    # Use the predicted label as the query for YouTube search
    query = predicted_label
    search_url = f"ytsearch5:{query}"  # Search for top 5 videos related to the label
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(search_url, download=False)
        results = []
        entries = info.get("entries", [])
        for entry in entries:
            if entry:
                results.append({
                    "title": entry.get("title"),
                    "url": f"https://www.youtube.com/watch?v={entry.get('id')}",
                    "uploader": entry.get("uploader"),
                    "duration": entry.get("duration"),
                })
    except Exception as e:
        return jsonify({"error": f"Error during YouTube search: {str(e)}"}), 500

    # Return both the classification label and YouTube results
    return jsonify({
        "label": predicted_label,
        "youtube_results": results
    })

if __name__ == "__main__":
    app.run(debug=True)