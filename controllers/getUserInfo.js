const prisma = require('../db/prisma');

/**
 * @description Get user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User information
 */
const getUserInfo = async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await prisma.User.findUnique({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(
            {
                "status": "success",
            "message": "Here's the user info",
            "data": {
              "userId": user.userId,
              "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "phone": user.phone
            }
        }
        );
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = getUserInfo;
