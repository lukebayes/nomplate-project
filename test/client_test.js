const assert = require('chai').assert;
const client = require('../').client;
const testHelper = require('nomplate/test_helper');

describe('Client', () => {
  let instance, fakeWin;

  beforeEach(() => {
    // Create a simple window stub that allows the client entry point to set up
    // a setTimeout without locking up the test environment.
    fakeWin = {
      setTimeout: () => {},
    }
  });

  // Wrap the Nomplate testHelper.renderElement call for these tests.
  function render() {
    return testHelper.renderElement(client(fakeWin));
  }

  it('renders header element', () => {
    const header = render().querySelector('h1');
    assert.equal(header.innerHTML, 'Hello World');
  });

  it('renders 2 childern', () => {
    const elem = render();
    assert.equal(elem.childNodes.length, 2);
    assert.equal(elem.childNodes[0].childNodes.length, 1);
  });
});

