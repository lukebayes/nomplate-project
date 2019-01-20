const assert = require('chai').assert;

const dom = require('nomplate').dom;
const client = require('../').client;

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

