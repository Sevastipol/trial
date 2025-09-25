chrome.storage.local.get(['isBlocking'], function(result) {
  const isBlocking = result.isBlocking !== false; // Default to true
  if (isBlocking) {
    chrome.scripting.executeScript({
      target: { tabId: chrome.runtime.getCurrentTabId() },
      files: ['blocker.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Script injection failed:', chrome.runtime.lastError);
      }
    });
  }
});

// Listen for changes to blocking state
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.isBlocking) {
    location.reload(); // Reload to apply new blocking state
  }
});
