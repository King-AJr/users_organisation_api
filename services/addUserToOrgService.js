// organisationService.js

const prisma = require('../db/prisma');

/**
 * Add a user to an organisation
 * @param {number} userId - ID of the user to add
 * @param {number} orgId - ID of the organisation to add the user to
 * @param {number} requesterUserId - ID of the user making the request
 * @returns {Promise<boolean>} - True if user added successfully, false otherwise
 */
const addUserToOrgService = async (userId, orgId, requesterUserId) => {
  try {
    // Check if the user exists
    const user = await prisma.User.findUnique({
      where: {
        userId: parseInt(userId)
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Retrieve the requesting user's information
    const reqUser = await prisma.User.findUnique({
      where: {
        userId: requesterUserId
      }
    });

    // Retrieve the organisation
    const organisation = await prisma.organisation.findUnique({
      where: { orgId: parseInt(orgId) }
    });

    if (!organisation) {
      throw new Error("Organisation not found");
    }

    // Check if the requesting user is part of the organisation
    if (!reqUser.organisation.includes(orgId.toString())) {
      throw new Error("Requesting user is not part of this organisation");
    }

    // Append the new user ID to the organisation's users array
    const updatedOrganisations = [...user.organisation, parseInt(orgId)];

    // Update the user with the new organisation array
    await prisma.User.update({
      where: { userId: parseInt(userId) },
      data: { organisation: { set: updatedOrganisations } },
    });

    return true;
  } catch (error) {
    throw new Error(`Failed to add user to organisation: ${error.message}`);
  }
};

module.exports = addUserToOrgService;
