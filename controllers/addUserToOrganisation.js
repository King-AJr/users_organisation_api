// controllers/addUserToOrganization.js

const prisma = require('../db/prisma');

const addUserToOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the organization exists
    const organisation = await prisma.organisation.findUnique({
      where: {
        orgId: parseInt(orgId)
      }
    });

    if (!organisation) {
      return res.status(404).json({
        status: "Not Found",
        message: "Organization not found"
      });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        userId: parseInt(userId)
      }
    });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found"
      });
    }

    await prisma.userOrganisation.create({
      data: {
        userId: parseInt(userId),
        organisationId: parseInt(orgId)
      }
    });

    res.status(200).json({
      status: "Success",
      message: "User added to organization successfully"
    });
  } catch (error) {
    console.error('Error adding user to organization:', error);
    res.status(500).json({
      status: "Internal Server Error",
      message: "An error occurred while adding user to organization",
      error: error.message
    });
  }
};

module.exports = addUserToOrganisation;
