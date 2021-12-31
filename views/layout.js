const dom = require('nomplate').dom;

function main(options, renderView) {
  // Use minified sources for production environment
  const scriptSource = options.settings && options.settings.env === 'production' ? '/dist/client.min.js' : '/dist/client.js';

  console.log('Main view rendered');

  return dom.html({lang: 'en'}, () => {
    dom.head(() => {
      dom.meta({charset: 'utf8'});
      dom.title('Nomplate Project');

      dom.script({src: scriptSource, type: 'text/javascript'});
      dom.style(() => {
        dom.selector('body', {
          backgroundColor: 'pink',
          font: '1.2em "Arial Verdana _sans", sans-serif',
        });
        dom.selector('h1', {
          color: '#222',
        });
        dom.selector('img', {
          border: '1px solid #333',
          width: '200px',
          height: '200px',
        });
      });
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
