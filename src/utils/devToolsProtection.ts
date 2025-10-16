// WARNING: These are easily bypassed and provide NO real security
// They may interfere with legitimate users and accessibility tools

export const setupBasicDevToolsProtection = () => {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable common keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+P
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
      (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
      (e.ctrlKey && (e.key === 'a' || e.key === 'A')) ||
      (e.ctrlKey && (e.key === 'p' || e.key === 'P'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Basic dev tools detection (unreliable)
  let devtools = {
    open: false,
    orientation: null
  };

  const threshold = 160;
  setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        // You could redirect or show a warning here
        console.clear();
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Clear console periodically
  setInterval(() => {
    console.clear();
  }, 1000);
};

// Optional: More aggressive protection (impacts user experience significantly)
export const setupAggressiveProtection = () => {
  // Disable text selection
  document.onselectstart = () => false;
  document.ondragstart = () => false;

  // Disable printing
  window.addEventListener('beforeprint', (e) => {
    e.preventDefault();
    return false;
  });

  // Clear console on blur/focus
  window.addEventListener('blur', () => {
    console.clear();
  });

  window.addEventListener('focus', () => {
    console.clear();
  });
};