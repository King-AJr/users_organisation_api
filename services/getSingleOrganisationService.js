const prisma = require('../db/prisma');

const getSingleOrganisationService = async (userId, organisationId) => {
  try {
    const requester = await prisma.user.findUnique({
      where: { userId },
      select: {
        organisation: true,
      },
    });

    if (!requester || !requester.organisation.includes(organisationId.toString())) {
      return null;
    }

    const organisation = await prisma.organisation.findUnique({
      where: { orgId: organisationId },
    });

    return organisation;
  } catch (error) {
    throw new Error('Could not retrieve organisation');
  }
};


module.exports = getSingleOrganisationService