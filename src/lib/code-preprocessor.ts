export function preprocessForBrowser(code: string): string {
  let processed = code;
  // Remove all import statements
  processed = processed.replace(/^import\s+.*?;?\s*$/gm, '');
  // Remove export default
  processed = processed.replace(/export\s+default\s+/g, '');
  // Remove other exports
  processed = processed.replace(/^export\s+/gm, '');
  // Clean up blank lines
  processed = processed.replace(/\n{3,}/g, '\n\n');
  return processed.trim();
}

export function buildPreviewHtml(code: string): string {
  const processed = preprocessForBrowser(code);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body{margin:0;font-family:system-ui,sans-serif}*{box-sizing:border-box}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef, useCallback, useMemo } = React;
    ${processed}
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  <\/script>
</body>
</html>`;
}
