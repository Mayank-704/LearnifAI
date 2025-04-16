// popup.js

let selectedText = '';
let voiceText = '';

const selectBtn = document.getElementById('select-btn');
const listenBtn = document.getElementById('listen-btn');
const sendBtn = document.getElementById('send-btn');
const cancelBtn = document.getElementById('cancel-btn');
const selectedTextDiv = document.getElementById('selected-text');
const voiceTextDiv = document.getElementById('voice-text');
const resultBox = document.getElementById('result');

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

// Send final data to Groq (mocked for now)
sendBtn.addEventListener('click', async () => {
  if (!selectedText || !voiceText) {
    resultBox.textContent = '⚠️ Please provide both selected text and voice input.';
    return;
  }

  resultBox.textContent = '🚀 Sending to Groq...';

  try {
    const finalPrompt = `Explain this:\n"${selectedText}"\n\nWith instruction:\n"${voiceText}"`;

    // Simulate a Groq API response for now
    setTimeout(() => {
      resultBox.textContent = `✅ Response from Groq:\n"${finalPrompt}"`;
    }, 1500);

    // Later: Replace with actual fetch() call to Groq API here

  } catch (err) {
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
