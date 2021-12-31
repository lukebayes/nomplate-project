const assert = require('chai').assert;
const dom = require('nomplate').dom;
const {JSDOM} = require('jsdom');
const layout = require('../views/layout');
const renderElement = require('nomplate').renderElement;

describe('Server', () => {
  let instance;

  function render(options) {
    const fakeDoc = new JSDOM('').window.document;
    return renderElement(layout(options || {}, () => {
      return dom.div({id: 'fake-client'});
    }), fakeDoc);
  }

  it('is instantiable', () => {
    assert.isNotNull(render());
  });

  it('renders expected elements', () => {
    const appContext = render().querySelector('#app-context');
    assert.isNotNull(appContext);
  });

  it('renders dev script source', () => {
    const scriptTag = render({settings: {env: 'development'}}).querySelector('script');
    assert.isNotNull(scriptTag);
    assert.equal(scriptTag.src, '/dist/client.js');
  });

  it('renders minified script source', () => {
    const scriptTag = render({settings: {env: 'production'}}).querySelector('script');
    assert.isNotNull(scriptTag);
    assert.equal(scriptTag.src, '/dist/client.min.js');
  });
});

