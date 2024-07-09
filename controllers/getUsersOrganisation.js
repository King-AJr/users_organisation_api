const { getRepository } = require('typeorm');
const User = require('../db/entity/User');
const Organisation = require('../db/entity/organisations');

/**
 * Get all organizations where the user is a member
 * @param {*} req 
 * @param {*} res 
 */
const getUserOrganizations = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Retrieve the user's organisations
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: { userId: userId },
            relations: ['organisations'],
        });

        if (!user) {
            return res.status(404).json({
                status: "Not Found",
                message: "User not found",
                statusCode: 404
            });
        }

        // Retrieve organisation details for the user's organisations
        const organisations = user.organisations;

        res.status(200).json({
            status: "Success",
            message: "Organizations retrieved successfully",
            data: organisations
        });
    } catch (error) {
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while retrieving organizations",
            statusCode: 500,
            error: error.message
        });
    }
};

module.exports = getUserOrganizations;
