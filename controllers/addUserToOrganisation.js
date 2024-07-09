const addUserToOrgService = require('../services/addUserToOrgService');


/**
 * Controller function to handle organisation creation
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 */

const addUserToOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { userId } = req.body;
  const requestingUser = req.user;

  try {
    await addUserToOrgService(parseInt(userId), parseInt(orgId), requestingUser.userId);

    res.status(200).json({
      status: "Success",
      message: "User added to organization successfully",
      statusCode: 200
    });
  } catch (error) {
    if (error.message === "User not found" || error.message === "Organisation not found" || error.message === "Requesting user is not part of this organisation") {
      return res.status(404).json({
        status: "Bad request",
        message: error.message,
        statusCode: 404
      });
    } else {
      res.status(404).json({
        status: "Bad request",
        message: error.message,
        statusCode: 404
      });
    }
  }
};

module.exports = addUserToOrganisation;
