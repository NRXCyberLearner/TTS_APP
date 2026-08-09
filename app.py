from flask import Flask, render_template, request, jsonify
import edge_tts
import asyncio
import uuid
import os

app = Flask(__name__)

AUDIO_FOLDER = "static/audio"
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# वॉइस मैपिंग
VOICE_MAP = {
    "english": {
        "female": "en-US-JennyNeural",
        "male": "en-US-GuyNeural"
    },
    "hindi": {
        "female": "hi-IN-SwaraNeural",
        "male": "hi-IN-MadhurNeural"
    }
}

async def generate_speech_async(text, voice, rate, output_file):
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_file)

def generate_speech(text, voice, rate):
    """सिंक्रोनस फंक्शन - async को कॉल करता है"""
    output_file = os.path.join(AUDIO_FOLDER, f"{uuid.uuid4().hex}.mp3")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(generate_speech_async(text, voice, rate, output_file))
    finally:
        loop.close()
    return output_file

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.json
        text = data.get("text")
        language = data.get("language")
        voice_type = data.get("voice")
        speed = data.get("speed", 0)

        if not text:
            return jsonify({"error": "Text is required"}), 400

        # स्पीड फॉर्मेट
        rate = f"{int(speed)}%" if speed != 0 else "+0%"

        # वॉइस सेलेक्ट
        if language in VOICE_MAP and voice_type in VOICE_MAP[language]:
            voice = VOICE_MAP[language][voice_type]
        else:
            voice = "en-US-JennyNeural"

        # TTS जनरेट करें
        audio_path = generate_speech(text, voice, rate)
        
        audio_url = audio_path.replace("\\", "/")
        return jsonify({"audio_url": audio_url})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/rename", methods=["POST"])
def rename_file():
    try:
        data = request.json
        old_path = data.get("old_path")
        new_name = data.get("new_name")

        if not old_path or not new_name:
            return jsonify({"success": False, "error": "Invalid data"}), 400

        old_filename = os.path.basename(old_path)
        old_full = os.path.join(AUDIO_FOLDER, old_filename)
        new_full = os.path.join(AUDIO_FOLDER, f"{new_name}.mp3")

        if os.path.exists(old_full):
            os.rename(old_full, new_full)
            return jsonify({
                "success": True, 
                "new_url": f"/static/audio/{new_name}.mp3"
            })
        else:
            return jsonify({"success": False, "error": "File not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
