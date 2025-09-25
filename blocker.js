(function() {
  const originalOpen = window.open;
  window.open = function(url, name, features) {
    console.log('Blocked window.open() call');
    return null;
  };
})();
