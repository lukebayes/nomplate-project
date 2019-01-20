const dom = require('nomplate').dom;

function main(options, renderView) {
  return dom.html({lang: 'en'}, () => {
    dom.head(() => {
      dom.meta({charset: 'utf8'});
      dom.title('Nomplate Project');
      dom.link({rel: 'stylesheet', href: 'static/styles.css'});
      // TODO(lbayes): If production mode, use minified and gzipped binary.
      dom.script({src: '/dist/client.js', type: 'text/javascript'});
    });
    dom.body(() => {
      dom.div({id: 'app-context'}, () => {
        // This call will render the selected view.
        renderView();
      });
    });
  });
}

module.exports = main;
