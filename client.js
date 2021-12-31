const client = require('./').client;
const ready = require('nomplate').ready;
const renderElement = require('nomplate').renderElement;

// Elements can be created immediately (i.e., before the entire page loads).
console.log('Client loaded with:', window, 'and', document);
const liveClient = renderElement(client(window), document);

ready(document, () => {
  // Wait for page load before attaching elements:
  const staticClient = document.getElementById('client-app');
  staticClient.parentNode.replaceChild(liveClient, staticClient);
  console.log('Nomplate live client ready');
});
