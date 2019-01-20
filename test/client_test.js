const assert = require('chai').assert;
const dom = require('nomplate').dom;
const {JSDOM} = require('jsdom');
const client = require('../').client;
const renderElement = require('nomplate').renderElement;

describe('Client', () => {
  let instance;

  function render(options) {
    const fakeWindow = new JSDOM('').window;
    return renderElement(client(fakeWindow), fakeWindow.document);
  }

  it('is instantiable', () => {
    assert.isNotNull(render());
  });

  it('renders header element', () => {
    const client = render().querySelector('h1');
    assert.equal(client.innerHTML, 'Hello World');
  });

  it('renders 2 childern', () => {
    const client = render();
    assert.equal(client.childNodes.length, 2);
    assert.equal(client.childNodes[0].childNodes.length, 1);
  });
});


