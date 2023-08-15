const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(Math.ceil(16 / 2))
    .toString('hex')
    .slice(0, 16);
}

module.exports = {
  generateToken,
};