// content.js

// Listener for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'GET_SELECTED_TEXT') {
      const selectedText = window.getSelection().toString().trim();
  
      // Respond with the selected text or a fallback message
      sendResponse({
        text: selectedText || 'No text selected.',
      });
  
      // Return true to indicate we're sending an async response
      return true;
    }
  });

  // content.js (extend this)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'START_VOICE') {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendResponse({ speech: transcript });
    };

    recognition.onerror = (event) => {
      sendResponse({ error: event.error });
    };

    recognition.start();

    // Allow async sendResponse
    return true;
  }
});

  