const prisma = require('../db/prisma');

/**
 * Get user information if they are in the same organisation as the requesting user
 * @param {number} userId - ID of the user to fetch information for
 * @param {number} requestingUserId - ID of the user making the request
 * @returns {Promise<object>} - User information
 * @throws {Error} - Throws error if user not found or access denied
 */
const getUserInfoService = async (userId, requestingUserId) => {
  try {
    // Retrieve the requested user's information
    const user = await prisma.User.findUnique({
      where: { userId: userId },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        organisations: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Retrieve the requesting user's information
    const requester = await prisma.User.findUnique({
      where: { userId: requestingUserId },
      select: {
        organisations: true,
      },
    });

    if (!requester) {
      throw new Error('Requesting user not found or access denied');
    }

    // Check for any overlapping organizations
    const isSameOrg = user.organisations.some(orgId => requester.organisations.includes(orgId));

    if (!isSameOrg) {
      throw new Error('Access denied: Users are not in the same organization');
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
