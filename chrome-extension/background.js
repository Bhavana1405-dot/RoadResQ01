chrome.runtime.onInstalled.addListener(() => {
  console.log('Prompt Enhancer extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle messages from content script or popup
  if (request.type === 'ENHANCE_PROMPT') {
    // Add prompt enhancement logic here
    sendResponse({ success: true });
  }
}); 