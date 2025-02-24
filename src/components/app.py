import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch
import yt_dlp

app = Flask(__name__)
CORS(app)  # Enable CORS for front-end requests

# ------------------- ViT + YouTube Search Setup -------------------
model_name = "google/vit-base-patch16-224"
processor = ViTImageProcessor.from_pretrained(model_name)
model = ViTForImageClassification.from_pretrained(model_name)
model.eval()

@app.route("/")
def index():
    return (
        "<h1>Integrated API</h1>"
        "<p>POST an image to <code>/classify_search</code> for classification & YouTube results.<br>"
        "POST JSON to <code>/gemini</code> to get 10 static MCQ questions about a topic.</p>"
    )

@app.route("/classify_search", methods=["POST"])
def classify_search():
    """
    Expects a file under 'image' in form-data.
    Classifies the image using ViT and performs a YouTube search based on the label.
    Returns JSON with { label, youtube_results }.
    """
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        file = request.files["image"]
        image = Image.open(file.stream).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    # Classification with ViT
    try:
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_index = logits.argmax(-1).item()
            predicted_label = model.config.id2label[predicted_index]
    except Exception as e:
        return jsonify({"error": f"Error during classification: {str(e)}"}), 500

    # YouTube search with yt-dlp
    query = predicted_label
    search_url = f"ytsearch5:{query}"
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

    return jsonify({
        "label": predicted_label,
        "youtube_results": results
    })

# ------------------- Gemini MCQ (Static 10 Questions) -------------------

def generate_mcqs(object_name: str):
    """
    Returns 10 static multiple-choice questions (MCQs) about the given object_name.
    No LLM is used; these are placeholders you can customize.
    """
    return [
        {
            "question": f"What is {object_name} commonly used for?",
            "options": [
                "No known usage",
                f"A key function of {object_name} in daily life",
                "Only for decoration",
                "It's not used at all"
            ],
            "answer": 1
        },
        {
            "question": f"Which statement is true about {object_name}?",
            "options": [
                f"{object_name} was invented last year",
                f"{object_name} has been used for centuries",
                "No one has heard of it",
                f"{object_name} can only be used once"
            ],
            "answer": 1
        },
        {
            "question": f"Which of the following best describes {object_name}?",
            "options": [
                "An extinct animal",
                "A technology brand",
                "A mythical creature",
                f"An item widely recognized as '{object_name}'"
            ],
            "answer": 3
        },
        {
            "question": f"Which field commonly involves {object_name}?",
            "options": [
                "Astrophysics",
                "Marine biology",
                f"Areas related to {object_name}",
                "None of the above"
            ],
            "answer": 2
        },
        {
            "question": f"Why might someone study or use {object_name}?",
            "options": [
                f"To understand how {object_name} impacts daily tasks",
                "It’s a random curiosity",
                "Only for comedic purposes",
                "They wouldn't, it’s useless"
            ],
            "answer": 0
        },
        {
            "question": f"Which historical figure is associated with {object_name}?",
            "options": [
                f"No historical figure used {object_name}",
                f"A famous inventor popularized {object_name}",
                "A mythical king from ancient times",
                "None of the above"
            ],
            "answer": 1
        },
        {
            "question": f"How has {object_name} changed over time?",
            "options": [
                "It has never changed",
                f"It has evolved significantly in design and usage",
                "It was once alive but is now extinct",
                "It is only a modern concept"
            ],
            "answer": 1
        },
        {
            "question": f"Which culture is most closely associated with {object_name}?",
            "options": [
                "No culture at all",
                f"Several cultures worldwide use {object_name}",
                "Only one specific tribe",
                "It's strictly Western"
            ],
            "answer": 1
        },
        {
            "question": f"In modern times, what is a key challenge for {object_name}?",
            "options": [
                "It’s too expensive to produce",
                "It’s heavily regulated by governments",
                f"Finding sustainable ways to create or use {object_name}",
                "It has no challenges at all"
            ],
            "answer": 2
        },
        {
            "question": f"What is a likely future trend for {object_name}?",
            "options": [
                f"Increased innovation in {object_name}",
                "It will vanish entirely",
                "It will be illegal to use {object_name}",
                "No changes are expected"
            ],
            "answer": 0
        }
    ]

@app.route("/gemini", methods=["POST"])
def gemini():
    """
    Expects JSON payload: { "object": "some_topic" }
    Returns 10 static MCQs about that topic (no LLM).
    """
    data = request.get_json()
    if not data or "object" not in data:
        return jsonify({"error": "Missing 'object' in JSON"}), 400

    object_name = data["object"]
    mcqs = generate_mcqs(object_name)

    return jsonify({
        "object": object_name,
        "mcqs": mcqs
    })

if __name__ == "__main__":
    app.run(debug=True)