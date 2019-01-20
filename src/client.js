var dom = require('nomplate').dom;

function client(win) {
  return dom.div({id: 'client-app'}, () => {
    // Just text content
    dom.h1('Hello World');
    dom.div((update) => {
      dom.span('Now: ' + Date.now());
      // Re-render every second
      win.setTimeout(update, 1000);
    });
  });
};

module.exports = client;

