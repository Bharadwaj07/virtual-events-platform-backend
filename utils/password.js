const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (plainText, hashed) => {
  return await bcrypt.compare(plainText, hashed);
};

module.exports = {
  hashPassword,
  comparePassword
};
