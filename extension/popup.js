document.addEventListener('DOMContentLoaded', () => {
    const selectedTextEl = document.getElementById('selectedText');
    const voiceTextEl = document.getElementById('voiceText');
    const micButton = document.getElementById('micButton');
    const sendCommandButton = document.getElementById("sendCommandButton");
  
    let selectedText = "";
  
    // 1. Get selected text from the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tab found.");
            return;
        }
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError.message);
            selectedTextEl.textContent = "Error fetching selected text.";
        } else {
            selectedText = response?.text || "";
            selectedTextEl.textContent = selectedText;
        }
      });
    });
  
    // 2. Setup Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
  
    // 3. Mic button click starts listening
    micButton.addEventListener("click", () => {
      micButton.textContent = "Listening...";
      recognition.start();
    });
  
    // 4. When voice is recognized
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceTextEl.textContent = `You said: ${transcript}`;
      micButton.textContent = "Speak";
  
      // Send voice command to background script
      chrome.runtime.sendMessage({ command: transcript }, (response) => {
        if (response?.success) {
          console.log("Command sent successfully");
        } else {
          console.error("Failed to send command");
        }
      });
    };
  
    // 5. Error and end handlers
    recognition.onerror = () => {
      micButton.textContent = "Speak";
      voiceTextEl.textContent = "Error recognizing speech.";
    };
  
    recognition.onend = () => {
      micButton.textContent = "Speak";
    };
  
    // 6. Optional manual send button
    sendCommandButton.addEventListener("click", () => {
      const command = voiceTextEl.textContent.replace("You said: ", "");
      chrome.runtime.sendMessage({ command }, (response) => {
        if (response?.success) {
          console.log("Manual command sent");
        } else {
          console.error("Failed to send manual command");
        }
      });
    });
  
    // 7. Receive response from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "commandResponse") {
        console.log("Response from background script:", request.response);
        // You can update UI here
      }
    });
  });
  