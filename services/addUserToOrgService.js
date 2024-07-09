// services/addUserToOrgService.js
const { getRepository } = require("typeorm");
const User = require("../db/entity/User");
const Organisation = require("../db/entity/organisations");

/**
 * Add a user to an organisation
 * @param {number} userId - ID of the user to add
 * @param {number} orgId - ID of the organisation to add the user to
 * @param {number} requesterUserId - ID of the user making the request
 * @returns {Promise<boolean>} - True if user added successfully, false otherwise
 */
const addUserToOrgService = async (userId, orgId, requesterUserId) => {
  try {
    const userRepository = getRepository(User);
    const organisationRepository = getRepository(Organisation);

    // Find the user
    const user = await userRepository.findOne({ where: { userId }, relations: ["organisations"] });
    if (!user) {
      throw new Error("User not found");
    }

    // Find the organisation
    const organisation = await organisationRepository.findOne({ where: { orgId }, relations: ["users"] });
    if (!organisation) {
      throw new Error("Organisation not found");
    }

    // Find the requesting user
    const reqUser = await userRepository.findOne({ where: { userId: requesterUserId }, relations: ["organisations"] });
    if (!reqUser) {
      throw new Error("Requesting user not found");
    }

    // Check if the requester is part of the organisation
    const isRequesterPartOfOrg = reqUser.organisations.some(org => org.orgId === orgId);
    if (!isRequesterPartOfOrg) {
      throw new Error("Requesting user is not part of this organisation");
    }

    // Add the organisation to the user's list of organisations
    if (!user.organisations) {
      user.organisations = [];
    }
    user.organisations.push(organisation);

    // Save changes
    await userRepository.save(user);

    return true;
  } catch (error) {
    throw new Error(`Failed to add user to organisation: ${error.message}`);
  }
};

module.exports = addUserToOrgService;
