const dom = require('nomplate').dom;

function main(options, renderView) {
  // Use minified sources for production environment
  const scriptSource = options.settings && options.settings.env === 'production' ? '/dist/client.min.js' : '/dist/client.js';

  return dom.html({lang: 'en'}, () => {
    dom.head(() => {
      dom.meta({charset: 'utf8'});
      dom.title('Nomplate Project');
      dom.link({rel: 'stylesheet', href: 'static/styles.css'});
      dom.script({src: scriptSource, type: 'text/javascript'});
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
