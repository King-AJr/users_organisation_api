// services/authService.js

const bcrypt = require('bcrypt');
const checkEmailExists = require('../utils/checkEmailExist');
const createToken = require('../utils/createToken');

/**
 * Authenticates a user based on email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<object>} - User information and access token
 * @throws {Error} - Throws error if authentication fails
 */
const loginService = async (email, password) => {
  try {
    // Retrieve user info from DB via email
    const userInfo = await checkEmailExists(email, true);

    // Compare password with DB password
    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (!isMatch) {
      throw new Error('Authentication failed');
    }

    // Create a token
    const token = createToken(userInfo);

    return {
      accessToken: token,
      user: {
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
      },
    };
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

module.exports = loginService