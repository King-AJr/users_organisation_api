const prisma = require('../db/prisma');

/**
 * Get all organizations where the user is a member
 * @param {*} req 
 * @param {*} res 
 */
const getUserOrganizations = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Retrieve the user's organisations
        const user = await prisma.user.findUnique({
            where: { userId: userId },
            select: { organisations: true },
        });

        if (!user) {
            return res.status(404).json({
                status: "Not Found",
                message: "User not found",
                statusCode: 404
            });
        }

        // Retrieve organisation details for the user's organisations
        const organisations = await prisma.organisation.findMany({
            where: { orgId: { in: user.organisations } },
        });

        res.status(200).json({
            status: "Success",
            message: "Organizations retrieved successfully",
            data: organisations
        });
    } catch (error) {
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while retrieving organizations",
            statusCode: 500
        });
    }
};

module.exports = getUserOrganizations;
