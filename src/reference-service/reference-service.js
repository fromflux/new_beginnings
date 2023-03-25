const crypto = require('crypto');

// assuming this would be an existing service as described
function generate() {
  return new Promise((resolve) => { resolve(crypto.randomUUID()) });
}

module.exports = {
  generate,
}