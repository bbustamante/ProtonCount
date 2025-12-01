// content.js
const REFRESH_INTERVAL = 1000;

function updateWidgetContent() {
  const widget = document.getElementById('floating-widget');
  if (!widget) return; // If still not available, exit

  // Clear existing content
  widget.textContent = '';

  // Get selection counts (if any)
  const { charCount: selCharCount, wordCount: selWordCount } = getSelectCounts();

  if (selCharCount > 0 || selWordCount > 0) {
    // If there is a selection, show selection counts
    widget.appendChild(createCountList(selCharCount, selWordCount));
    widget.style.backgroundColor = '#2D4C7B';
    return;
  }

  // Get default document counts
  const { charCount: charCount, wordCount: wordCount } = getDefaultCounts();

  // Proton Documents counts
  widget.appendChild(createCountList(charCount, wordCount));
  widget.style.backgroundColor = '#2c2c2c';
}

function getDefaultCounts() {
  // Get DOM elements with class "DocumentEditor"
  const documentEditor = document.getElementsByClassName("DocumentEditor");

  // Initialize character count
  let documentText = "";

  for (let editor of documentEditor) {
    // Accumulate text content from each editor (assuming multiple editors)
    documentText += editor.textContent.trim() + "\n";
  }

  // Calculate character count
  const charCount = documentText.length;

  // Calculate word count
  const wordCount = documentText.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Return counts
  return { charCount, wordCount };
}

function getSelectCounts() {
  // Get selected text
  const sel = window.getSelection ? window.getSelection() : document.getSelection();

  // Get selected text and trim
  let selectedText = sel.toString().trim();

  // Calculate character count
  const charCount = selectedText.length;

  // Calculate word count
  const wordCount = selectedText.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Return counts
  return { charCount, wordCount };
}

function createCountList(charCount, wordCount) {
  // Create a list to display counts
  const ul = document.createElement('ul');
  ul.style.margin = '0';
  ul.style.padding = '0';
  ul.style.listStyle = 'none';

  // Character count item
  const liChars = document.createElement('li');
  liChars.innerHTML = `<b>Chars:</b> ${charCount}`;
  ul.appendChild(liChars);

  // Word count item
  const liWords = document.createElement('li');
  liWords.innerHTML = `<b>Words:</b> ${wordCount}`;
  ul.appendChild(liWords);

  // Return the list element
  return ul;
}

// Wait for the widget to be created
const checkWidget = setInterval(() => {
  const widget = document.getElementById('floating-widget');
  if (widget) {
    clearInterval(checkWidget);
    updateWidgetContent();
    setInterval(updateWidgetContent, REFRESH_INTERVAL);
  }
}, 100);
