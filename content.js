// Function to add the Cursor install button
function addCursorButton() {
  // Find the container that holds the VS Code install button
  const installButtonContainer = document.querySelector('.ux-oneclick-install-button-container');

  if (!installButtonContainer) {
    console.log('Install button container not found');
    return false;
  }

  // Get the extension ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const extensionId = urlParams.get('itemName');

  if (!extensionId) {
    console.log('Extension ID not found in URL');
    return false;
  }

  // Check if our button already exists
  if (installButtonContainer.querySelector('.cursor-install-button')) {
    return true; // Button already exists, no need to add it again
  }

  // Clone the existing VS Code button
  const vscodeButton = installButtonContainer.querySelector('a.ms-Button');

  if (!vscodeButton) {
    console.log('VS Code button not found');
    return false;
  }

  /** @type {HTMLLinkElement} */
  const cursorButton = vscodeButton.cloneNode(true);

  // Update the href to use the Cursor URI scheme
  cursorButton.href = `cursor:extension/${extensionId}`;

  // Add a class to identify and style our button
  cursorButton.classList.add('cursor-install-button');

  // Update the button text
  const buttonLabel = cursorButton.querySelector('.ms-Button-label');
  if (buttonLabel) {
    buttonLabel.textContent = 'Install in Cursor';
  }

  // Insert the Cursor button after the VS Code button
  installButtonContainer.appendChild(cursorButton);

  console.log('Cursor install button added successfully');
  return true;
}

// Use a MutationObserver to watch for changes to the DOM
function setupMutationObserver() {
  // Configuration for the observer (observe everything)
  const config = { 
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  };

  // Create an observer instance
  const observer = new MutationObserver((mutations) => {
    // If we successfully add the button, disconnect the observer to prevent further changes
    if (addCursorButton()) {
      // Don't disconnect, as the page might reload parts dynamically
      // Just let it continue to monitor, our function will check if button exists
    }
  });

  // Start observing the document body for configured mutations
  observer.observe(document.body, config);

  // Also try to add the button immediately
  addCursorButton();
}

// Run our setup when the page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMutationObserver);
} else {
  setupMutationObserver();
}

// Also try to run it after a short delay to ensure the VS Code button has loaded
setTimeout(addCursorButton, 500);
setTimeout(addCursorButton, 1000);
setTimeout(addCursorButton, 2000);
