// services/getUserInfoService.js
const { getRepository } = require("typeorm");
const User = require("../db/entity/User");

/**
 * Get user information if they are in the same organisation as the requesting user
 * @param {number} userId - ID of the user to fetch information for
 * @param {number} requestingUserId - ID of the user making the request
 * @returns {Promise<object>} - User information
 * @throws {Error} - Throws error if user not found or access denied
 */
const getUserInfoService = async (userId, requestingUserId) => {
  try {
    const userRepository = getRepository(User);

    // Retrieve the requested user's information
    const user = await userRepository.findOne({
      where: { userId },
      relations: ["organisations"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Retrieve the requesting user's information
    const requester = await userRepository.findOne({
      where: { userId: requestingUserId },
      relations: ["organisations"],
    });

    if (!requester) {
      throw new Error("Requesting user not found or access denied");
    }

    // Check for any overlapping organizations
    const isSameOrg = user.organisations.some(org =>
      requester.organisations.some(reqOrg => reqOrg.orgId === org.orgId)
    );

    if (!isSameOrg) {
      throw new Error("Access denied: Users are not in the same organization");
    }

    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    throw new Error(`Failed to get user information: ${error.message}`);
  }
};

module.exports = getUserInfoService;
