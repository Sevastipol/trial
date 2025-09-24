chrome.storage.local.get(['isBlocking'], function(result) {
  const isBlocking = result.isBlocking !== false; // Default to true
  if (isBlocking) {
    const originalOpen = window.open;
    window.open = function() {
      console.log('Blocked window.open() call');
      return null;
    };
  }
});

// Listen for changes to blocking state
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.isBlocking) {
    location.reload(); // Reload to apply new blocking state
  }
});
