const dom = require('nomplate').dom;

function app(req, res) {
  return dom.div(() => {
    dom.div({id: 'header'}, () => {
      dom.h1('Server Side Header');
      dom.div({id: 'client-app'});
    });
  });
}

module.exports = app;

