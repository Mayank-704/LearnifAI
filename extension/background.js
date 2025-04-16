chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command) {
      console.log("Voice Command:", request.command);
      sendResponse({ success: true });
  
      // Optionally respond back to popup
      chrome.runtime.sendMessage({
        action: "commandResponse",
        response: `Received command: ${request.command}`
      });
    }
  });

    // filepath: c:\Users\Mohd Dishan\Desktop\LearnifAI\LearnifAI\extension\background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https?:/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        });
    }
});

console.log("Background script loaded");