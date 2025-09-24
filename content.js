chrome.storage.local.get(['isBlocking'], function(result) {
  const isBlocking = result.isBlocking !== false; // Default to true
  if (isBlocking) {
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const originalOpen = window.open;
        window.open = function(url, name, features) {
          console.log('Blocked window.open() call');
          return null;
        };
      })();
    `;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }
});

// Listen for changes to blocking state
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.isBlocking) {
    location.reload(); // Reload to apply new blocking state
  }
});
