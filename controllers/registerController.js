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
        if (error.type === "validation") {
          res.status(422).json({
            errors: error.errors
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "Registration unsuccessful",
            error: error.message
          });
        }
      }
    }

module.exports = registerUser;
