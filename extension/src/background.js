// background.js

let jwtToken = null;

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SET_TOKEN') {
    jwtToken = request.token;
    chrome.storage.local.set({ jwtToken }); // Optional: persist token
    sendResponse({ success: true });
  }

  if (request.action === 'GET_TOKEN') {
    if (jwtToken) {
      sendResponse({ token: jwtToken });
    } else {
      chrome.storage.local.get('jwtToken', (result) => {
        jwtToken = result.jwtToken || null;
        sendResponse({ token: jwtToken });
      });
    }
    return true; // async response
  }
});
