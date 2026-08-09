# 🎙️ VoiceForge Pro

> **A modern AI Text-to-Speech web application powered by Flask + Edge-TTS.**

![VoiceForge Pro](https://img.shields.io/badge/VoiceForge-Pro-purple?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.3.3-black?style=for-the-badge&logo=flask)
![TTS](https://img.shields.io/badge/Edge--TTS-Powered-8A2BE2?style=for-the-badge)

## ✨ About

**VoiceForge Pro** is a clean, premium-looking web-based AI voice generator designed to turn written text into MP3 speech.

The project provides:

- 🌐 English and Hindi voice generation
- 🎭 Female and male voice options
- ⚡ Adjustable speech speed
- 🎧 Built-in audio player
- 📥 MP3 download support
- ✏️ Generated audio file renaming
- 📱 Responsive interface for desktop and mobile
- 💜 Modern glassmorphism / neon-style UI

The frontend is built around the **VoiceForge Pro** interface, while the Flask backend handles speech generation and audio-file management.

## 👑 Owner

**noobh4ck3r**

> Built and maintained by **noobh4ck3r**.

## 🚀 Features

### 🎤 Text-to-Speech
Enter or paste text into the editor and generate speech through the backend.

### 🌍 Language Selection
Currently available:

- 🇺🇸 English (US)
- 🇮🇳 Hindi

### 👩‍💻 Voice Selection
Available voice types:

- 👩 Female
- 👨 Male

The backend maps these choices to Edge-TTS voices.

### ⚡ Speed Control
Speech speed can be adjusted from **-50% to +50%**.

### 🎧 Audio Preview
Generated MP3 audio can be played directly inside the browser.

### 📥 Download
Download the generated MP3 file for later use.

### ✏️ Rename Audio
Generated files can be renamed from the interface without manually navigating to the audio folder.

## 🧩 Project Structure

```text
VoiceForge-Pro/
│
├── app.py
├── index.html
├── style.css
├── script.js
├── requirements.txt
├── README.md
│
└── static/
    └── audio/
        └── generated-audio.mp3
```

> The Flask application automatically creates `static/audio/` when it starts.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| 🐍 Python | Backend logic |
| 🌶️ Flask | Web server and API |
| 🗣️ Edge-TTS | Speech generation |
| 🌐 HTML5 | Frontend structure |
| 🎨 CSS3 | UI and animations |
| ⚙️ JavaScript | Frontend interaction |
| 🎵 MP3 | Generated audio format |

## 📦 Installation

### 1. Clone or copy the project

```bash
git clone <YOUR_REPOSITORY_URL>
cd VoiceForge-Pro
```

Or simply place all project files inside the same directory.

### 2. Create a virtual environment

Linux / macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

Windows:

```powershell
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

The current backend imports `edge_tts`, so install it with:

```bash
pip install Flask==2.3.3 Werkzeug==2.3.7 edge-tts
```

You can also install the existing requirements file:

```bash
pip install -r requirements.txt
```

**Note:** the current `requirements.txt` contains Flask, gTTS, and Werkzeug, while `app.py` uses `edge_tts`. If you are setting up the project from scratch, make sure `edge-tts` is installed.

## ▶️ Run

Start the Flask server:

```bash
python app.py
```

The application listens on:

```text
http://0.0.0.0:5000
```

For local access, open:

```text
http://127.0.0.1:5000
```

For access from another device on the same network, use the host machine's local IP address:

```text
http://YOUR_LOCAL_IP:5000
```

## 🔌 API Endpoints

### `GET /`

Loads the VoiceForge Pro web interface.

### `POST /generate`

Generates an MP3 voice file.

Example request:

```json
{
  "text": "Hello from VoiceForge Pro!",
  "language": "english",
  "voice": "female",
  "speed": 0
}
```

Example response:

```json
{
  "audio_url": "static/audio/<generated-file>.mp3"
}
```

### `POST /rename`

Renames an existing generated MP3 file.

Example request:

```json
{
  "old_path": "static/audio/old-file.mp3",
  "new_name": "my-voice"
}
```

Example response:

```json
{
  "success": true,
  "new_url": "/static/audio/my-voice.mp3"
}
```

## 🎙️ Voice Mapping

The backend currently uses these Edge-TTS voices:

| Language | Female | Male |
|---|---|---|
| English | `en-US-JennyNeural` | `en-US-GuyNeural` |
| Hindi | `hi-IN-SwaraNeural` | `hi-IN-MadhurNeural` |

## 🎨 UI Highlights

VoiceForge Pro uses a premium dark interface featuring:

- 💎 Glassmorphism cards
- 🟣 Purple gradient accents
- ✨ Animated buttons
- 🎧 Audio result card
- 📱 Responsive mobile layout
- 🔔 Success/error notifications
- 🧮 Live character counter
- ⚡ Interactive speech-speed slider

## 🔐 Security Notes

This project is intended for personal use, development, and experimentation.

Before exposing the application to the public internet, consider adding:

- Authentication
- Rate limiting
- Input validation
- File-name sanitization
- Maximum text length limits
- Secure production configuration
- HTTPS
- A production WSGI server

Also avoid accepting arbitrary file paths or unsafe filenames from untrusted users.

## 🧪 Troubleshooting

### `ModuleNotFoundError: No module named 'edge_tts'`

Run:

```bash
pip install edge-tts
```

### Port 5000 is already in use

Run Flask on another port by changing the port in `app.py`, for example:

```python
app.run(debug=True, host="0.0.0.0", port=8080)
```

### Audio generation fails

Check that:

1. Python dependencies are installed.
2. The machine has network access required by Edge-TTS.
3. The selected language and voice values are valid.
4. The `static/audio/` directory is writable.

## 📱 Mobile / Termux

The application can be useful in a local Termux environment as well.

Basic setup:

```bash
pkg update
pkg install python
pip install flask edge-tts
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## 📌 Current Status

**Version:** `2.0`

**Status:** 🟢 Active Development

## 🗺️ Future Ideas

Possible upgrades for future versions:

- 🎚️ Pitch control
- 🎭 More voice personalities
- 🌍 More languages
- 📝 Text history
- 🗂️ Audio library
- 🗑️ Delete generated files
- 📊 Character/usage limits
- 🎛️ Advanced voice controls
- 🌙 Theme switching
- 🔑 User authentication
- ☁️ Optional cloud deployment

## ⚖️ Disclaimer

VoiceForge Pro is provided for legitimate text-to-speech and development purposes. Users are responsible for how generated audio is used and for complying with applicable service terms and laws.

## ❤️ Credits

**Owner:** `noobh4ck3r`

**Project:** `VoiceForge Pro`

**Engine:** `Edge-TTS`

**Backend:** `Flask`

---

<div align="center">

### 🎙️ VoiceForge Pro

**Turn words into voice.**

Made with ❤️ by **noobh4ck3r**

</div>
