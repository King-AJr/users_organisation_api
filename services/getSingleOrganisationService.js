// services/getSingleOrganisationService.js
const { getRepository } = require("typeorm");
const User = require("../db/entity/User");
const Organisation = require("../db/entity/organisations");

/**
 * Retrieves a single organisation if the user is a member of it
 * @param {number} userId - ID of the requesting user
 * @param {number} organisationId - ID of the organisation to retrieve
 * @returns {Promise<object|null>} - Organisation information or null if user is not a member
 * @throws {Error} - Throws error if organisation retrieval fails
 */
const getSingleOrganisationService = async (userId, organisationId) => {
  try {
    const userRepository = getRepository(User);
    const organisationRepository = getRepository(Organisation);

    // Retrieve the user's organisations
    const user = await userRepository.findOne({
      where: { userId },
      relations: ["organisations"],
    });

    if (!user || !user.organisations.some(org => org.orgId === organisationId)) {
      return null;  // User is not a member of the organisation
    }

    // Retrieve the organisation information
    const organisation = await organisationRepository.findOne({
      where: { orgId: organisationId },
    });

    return organisation;
  } catch (error) {
    throw new Error('Could not retrieve organisation');
  }
};

module.exports = getSingleOrganisationService;
