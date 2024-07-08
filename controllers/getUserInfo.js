const getUserInfoService = require('../services/getUserInfoService');

/**
 * @description Get user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User information
 */
const getUserInfo = async (req, res) => {
    const userId = parseInt(req.params.id);
  const requestingUser = req.user;

  try {
    const userInfo = await getUserInfoService(userId, requestingUser.userId);

    res.status(200).json({
      status: 'success',
      message: "Here's the user info",
      data: userInfo,
    });
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Requesting user not found or access denied' || error.message === 'Access denied: Users are not in the same organization') {
      return res.status(403).json({
        status: "Bad request",
        message: error.message,
        statusCode: 403,
      });
    } else {
      console.error('Error fetching user information:', error);
      return res.status(500).json({
        status: "Internal server error",
        message: 'Error fetching user information',
        error: error.message,
      });
    }
  }
};

module.exports = getUserInfo;
