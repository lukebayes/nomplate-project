var dom = require('nomplate').dom;

function client(win) {
  return dom.div({id: 'client-app'}, () => {
    // Just text content
    dom.h1('Client Rendered Content');
    dom.div((update) => {
      dom.span('Now: ' + Date.now());
      // Re-render every second
      win.setTimeout(update, 1000);

      dom.div(() => {
        dom.img({src: '/static/gnomeplate.png', alt: 'Gnome Plate'});
      });
    });
  });
};

module.exports = client;

