const prisma = require('../db/prisma');

/**
 * Get all organizations where the user is a member
 * @param {*} req 
 * @param {*} res 
 */
const getUserOrganizations = async (req, res) => {
    const userId = req.user.userId;

    try {
        const userOrganizations = await prisma.UserOrganisation.findMany({
            where: {
                userId: userId
            },
            include: {
                organisation: true
            }
        });

        console.log("userOrganizations: ", userOrganizations);

        const organizations = userOrganizations.map(userOrg => userOrg.organisation);

        res.status(200).json({
            status: "Success",
            message: "Organizations retrieved successfully",
            data: organizations
        });
    } catch (error) {
        res.status(400).json({
            "status": "Bad Request",
            "message": "Client error",
            "statusCode": 400
        });
    }
};

module.exports = getUserOrganizations;
