// widget.js
const WIDGET_ID = 'floating-widget';

(function waitForBody() {
  if (!document.body) {
    requestAnimationFrame(waitForBody);
    return;
  }

  if (document.getElementById(WIDGET_ID)) return;

  const widget = document.createElement('div');
  widget.id = WIDGET_ID;
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.left = '20px';
  widget.style.backgroundColor = '#2c2c2c';
  widget.style.color = '#fff';
  widget.style.padding = '10px';
  widget.style.borderRadius = '8px';
  widget.style.zIndex = 9999;
  widget.style.minWidth = '120px';
  widget.style.cursor = 'not-allowed';
  widget.textContent = 'Loading...';

  document.body.appendChild(widget);
})();
