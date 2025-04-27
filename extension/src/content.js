// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_SELECTED_TEXT') {
    const selectedText = window.getSelection().toString().trim();

    sendResponse({
      text: selectedText || 'No text selected.',
    });

    return true; // Let Chrome know we might respond asynchronously
  }

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

    return true; // Required to keep sendResponse usable asynchronously
  }
});
