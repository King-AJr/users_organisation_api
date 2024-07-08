const getSingleOrganisationService = require('../services/getSingleOrganisationService');

/**
 * Controller function to handle organisation creation
 * @param {*} req - HTTP request object
 * @param {*} res - HTTP response object
 */

const getSingleOrganisation = async (req, res) => {
  try {
    const organisationId = parseInt(req.params.orgId);
    const userId = req.user.userId;

    const organisation = await getSingleOrganisationService(userId, organisationId);

    if (!organisation) {
      return res.status(403).json({
        status: 'Bad request',
        message: 'You are not part of this organisation',
        statusCode: 403,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Information retrieved successfully',
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving organisation',
      error: error.message,
    });
  }
};

module.exports = getSingleOrganisation;