const assert = require('chai').assert;
const client = require('../').client;
const dom = require('nomplate').dom;

describe('Client', () => {
  let instance;

  beforeEach(() => {
    var fakeWindow = {};
    instance = client(fakeWindow);
  });

  it('is instantiable', () => {
    assert(instance);
  });
});

