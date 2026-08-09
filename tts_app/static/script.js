const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const languageSelect = document.getElementById("languageSelect");
const voiceSelect = document.getElementById("voiceSelect");
const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");
const generateBtn = document.getElementById("generateBtn");
const loadingDiv = document.getElementById("loading");
const audioContainer = document.getElementById("audioContainer");
const audioPlayer = document.getElementById("audioPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const renameBtn = document.getElementById("renameBtn");
const notificationDiv = document.getElementById("notification");

let currentAudioUrl = "";

// कैरेक्टर काउंट
textInput.addEventListener("input", () => {
    const count = textInput.value.length;
    charCount.textContent = count;
});

// स्पीड स्लाइडर
speedControl.addEventListener("input", () => {
    const val = parseInt(speedControl.value);
    if (val === 0) {
        speedValue.textContent = "Normal (0%)";
    } else if (val > 0) {
        speedValue.textContent = `Fast (+${val}%)`;
    } else {
        speedValue.textContent = `Slow (${val}%)`;
    }
});

function showNotification(msg, isError = false) {
    notificationDiv.textContent = msg;
    notificationDiv.className = `notification ${isError ? 'error' : ''}`;
    notificationDiv.classList.remove("hidden");
    setTimeout(() => {
        notificationDiv.classList.add("hidden");
    }, 3000);
}

generateBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();
    
    if (!text) {
        showNotification("Please enter some text to generate speech.", true);
        textInput.focus();
        return;
    }
    
    const payload = {
        text: text,
        language: languageSelect.value,
        voice: voiceSelect.value,
        speed: parseInt(speedControl.value)
    };
    
    loadingDiv.classList.remove("hidden");
    audioContainer.classList.add("hidden");
    generateBtn.disabled = true;
    generateBtn.style.opacity = "0.5";
    
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok && data.audio_url) {
            currentAudioUrl = data.audio_url;
            audioPlayer.src = currentAudioUrl;
            audioContainer.classList.remove("hidden");
            audioPlayer.play();
            showNotification("✨ Audio generated successfully! Enjoy the realistic voice.");
        } else {
            showNotification(data.error || "Failed to generate audio. Please try again.", true);
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification("Network error. Please check your connection and try again.", true);
    } finally {
        loadingDiv.classList.add("hidden");
        generateBtn.disabled = false;
        generateBtn.style.opacity = "1";
    }
});

downloadBtn.addEventListener("click", () => {
    if (currentAudioUrl) {
        const a = document.createElement("a");
        a.href = currentAudioUrl;
        a.download = `voiceforge_${Date.now()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showNotification("📥 Download started!");
    } else {
        showNotification("No audio available to download.", true);
    }
});

renameBtn.addEventListener("click", () => {
    if (!currentAudioUrl) {
        showNotification("No audio available to rename.", true);
        return;
    }
    
    const newName = prompt("Enter new name for the audio file:", "my_voice");
    if (newName && newName.trim()) {
        fetch("/rename", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                old_path: currentAudioUrl,
                new_name: newName.trim()
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                currentAudioUrl = data.new_url;
                audioPlayer.src = currentAudioUrl;
                showNotification(`✅ File renamed to "${newName}.mp3"`);
            } else {
                showNotification(data.error || "Rename failed.", true);
            }
        })
        .catch(err => {
            console.error("Rename error:", err);
            showNotification("Failed to rename file.", true);
        });
    }
});
