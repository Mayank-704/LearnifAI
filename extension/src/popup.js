let selectedText = '';
let voiceText = '';

const selectBtn = document.getElementById('select-btn');
const listenBtn = document.getElementById('listen-btn');
const sendBtn = document.getElementById('send-btn');
const cancelBtn = document.getElementById('cancel-btn');
const selectedTextDiv = document.getElementById('selected-text');
const voiceTextDiv = document.getElementById('voice-text');
const resultBox = document.getElementById('result');
const audioModeSelect = document.getElementById('audio-mode'); // New: <select id="audio-mode">

// Get selected text from content script
selectBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'GET_SELECTED_TEXT' },
      (response) => {
        selectedText = response?.text || '';
        selectedTextDiv.textContent = selectedText || 'No text selected.';
      }
    );
  });
});

// Capture voice input from content script
listenBtn.addEventListener('click', () => {
  resultBox.textContent = '🎤 Listening...';
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'START_VOICE' },
      (response) => {
        if (response?.error) {
          resultBox.textContent = `❌ Speech Error: ${response.error}`;
        } else {
          voiceText = response.speech;
          voiceTextDiv.textContent = voiceText;
          resultBox.textContent = '✅ Voice command received.';
        }
      }
    );
  });
});

// Handle TTS after response
const handleSpeech = async (text, mode) => {
  if (mode === 'browser') {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  } else if (mode === 'groq') {
    try {
      const response = await fetch('https://yourserver.com/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Groq TTS failed');

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error('Groq TTS error:', err);
      handleSpeech(text, 'browser'); // fallback
    }
  }
};

// Send final data to backend and play audio
sendBtn.addEventListener('click', async () => {
  if (!selectedText || !voiceText) {
    resultBox.textContent = '⚠️ Please provide both selected text and voice input.';
    return;
  }

  resultBox.textContent = '🚀 Sending to Groq...';

  try {
    const finalPrompt = `Explain this:\n"${selectedText}"\n\nWith instruction:\n"${voiceText}"`;
    const mode = audioModeSelect.value;

    const response = await fetch('https://yourserver.com/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: finalPrompt }),
    });

    const data = await response.json();
    const responseText = data.text || data.message || 'No response';

    resultBox.textContent = `✅ Response from Groq:\n"${responseText}"`;

    handleSpeech(responseText, mode);

  } catch (err) {
    console.error(err);
    resultBox.textContent = `❌ Error: ${err.message}`;
  }
});

// Cancel and reset everything
cancelBtn.addEventListener('click', () => {
  selectedText = '';
  voiceText = '';
  selectedTextDiv.textContent = '';
  voiceTextDiv.textContent = '';
  resultBox.textContent = '🧹 Cleared!';
});
