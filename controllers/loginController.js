const loginService = require('../services/loginService');

/**
 * Controller function to handle user login
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 */
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { accessToken, user } = await loginService(email, password);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: accessToken,
        user: user,
      },
    });
  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.status(401).json({
      status: "Bad request",
      message: error.message,
      statusCode: 401,
    });
  }
};

module.exports = loginController;
