const createOrgService = require("../services/createOrgService");

/**
 * Controller function to handle organisation creation
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 */


const createOrganisation = async(req, res) => {
    const user = req.user;
  const { name, description } = req.body;

  try {
    const newOrganisation = await createOrgService(user, name, description);

    res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: {
        orgId: newOrganisation.orgId,
        name: newOrganisation.name,
        description: newOrganisation.description
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad request",
      message: error.message
    });
  }
}

module.exports = createOrganisation