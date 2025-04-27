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
const saveBtn = document.getElementById('save-btn');


//Save Response in dashboard
saveBtn.addEventListener('click',()=>{
  if (!selectedText || !voiceText) {
    resultBox.textContent = '⚠️ Please provide both selected text and voice input before saving.';
    return;
  }

  const question = `${voiceText}:\n"${selectedText}"`;
  const answer = resultBox.textContent.replace(/^✅ Response from Groq:\n"/, '').replace(/"$/, '');

try {
  chrome.cookies.get({ url: 'https://learnifai-3.onrender.com', name: 'token' }, function(cookie) {
    let token; // Changed from const to let
    if (cookie) {
      console.log("Token retrieved:", cookie.value);
      token = cookie.value;
    } else {
      console.log("Didn't get cookie from user");
      resultBox.innerHTML = '⚠️ Please sign up or log in on <a href="https://learnifai-3.onrender.com/" target="_blank">LearnifAI</a> to save your data.';
      return;
    }
    // Now send the fetch request and manually attach the token
    fetch('https://learnifai-1.onrender.com/api/history/save', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 👈 sending token manually in Authorization header
      },
      body: JSON.stringify({ question, answer }),
    })
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error('Failed to save data');

      resultBox.textContent = '✅ Data saved successfully!';
    })
    .catch((err) => {
      console.error('Save error:', err);
      resultBox.textContent = `❌ Save error: ${err.message}`;
    });
  });
} catch (err) {
  console.error('Unexpected error:', err);
  resultBox.textContent = `❌ Unexpected error: ${err.message}`;
}
});

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
      const response = await fetch('https://learnifai-1.onrender.com/api/groq/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      console.log(response)
        if (response.status === 429) {
            alert('❌ Groq TTS Rate limit exceeded. Playing Browser TTS');
          handleSpeech(text, 'browser'); // fallback
          return;
        }
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



function refineTextForTTS(text) {
  if (!text) return '';

  // 1. Remove unnecessary characters
  text = text
    .replace(/[`*_>#+=\-|]/g, '') // remove markdown special chars
    .replace(/[\[\]{}]/g, '') // remove square and curly brackets
    .replace(/["]{2,}/g, '"') // replace multiple quotes with one
    .replace(/\n{2,}/g, '\n') // replace multiple newlines with single
    .trim();

  // 2. Improve code readability
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `Start of code block. ${code.replace(/\n/g, '. ').trim()}. End of code block.`;
  });

  // 3. Optional: make single newlines into pauses for better reading
  text = text.replace(/\n/g, '. ');

  return text;
}


// Send final data to backend and play audio
sendBtn.addEventListener('click', async () => {
  if (!selectedText || !voiceText) {
    resultBox.textContent = '⚠️ Please provide both selected text and voice input.';
    return;
  }

  resultBox.textContent = '🚀 Sending to Groq...';

  try {
    const finalPrompt = `${voiceText}:\n"${selectedText}`;
    console.log(finalPrompt);
    const mode = audioModeSelect.value;
    const selectedModel = document.getElementById('model-selector').value;

    const response = await fetch('https://learnifai-1.onrender.com/api/groq/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: finalPrompt, 
        model: selectedModel  // Send the selected model with the request
      }),
    });

    const data = await response.json();
    console.log(data);
    const responseText = data.response || data.text || data.message || 'No response';

  // Clean the response for better TTS
  const refinedResponseText = refineTextForTTS(responseText);

    resultBox.textContent = `${refinedResponseText}`;

    handleSpeech(responseText, mode);

  } catch (err) {
        console.log("Error while sending",err)
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
