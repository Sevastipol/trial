document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle');
  
  // Load saved state
  chrome.storage.local.get(['isBlocking'], function(result) {
    toggle.checked = result.isBlocking !== false; // Default to true
  });
  
  // Handle toggle change
  toggle.addEventListener('change', function() {
    chrome.storage.local.set({ isBlocking: toggle.checked }, function() {
      // Notify content scripts of change
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'stateChanged' });
      });
    });
  });
});
