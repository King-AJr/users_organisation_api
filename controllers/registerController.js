const registerUserService = require("../services/registerUserService");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const { accessToken, user } = await registerUserService(userData);
    
        res.status(201).json({
          status: "success",
          message: "Registration successful",
          data: {
            accessToken: accessToken,
            user: user,
          },
        });
      } catch (error) {
        res.status(422).json({
          status: "Bad request",
          message: "Registration unsuccessful",
          statusCode: 422,
          error: error.message
        });
      }
};

module.exports = registerUser;
