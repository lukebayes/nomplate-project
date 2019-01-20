var client = require('../').client;

function app(req, res) {

  return client({
    // Provide a fake window to the client for rendering.
    setTimeout: (handler, durationMs) => {
      handler();
    }
  });
}

module.exports = app;

