require('dotenv').config(); // Ensure this line is at the top of your entry file

const jwt = require('jsonwebtoken');

const prisma = require('../db/prisma');
const getTokenFromHeader = require('../utils/getTokenFromHeader');

/**
 * Middleware to authenticate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authenticateToken = async (req, res, next) => {
    // Extract token from headers
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = getTokenFromHeader(authHeader);


    if (!token) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "Token not provided",
            statusCode: 401
        });
    }

    try {
        const user = jwt.verify(token, process.env.APP_SECRET);

        // Check if the user exists in the database
        const dbUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (!dbUser) {
            return res.status(403).json({
                status: "Forbidden",
                message: "Invalid or expired token",
                statusCode: 403
            });
        }

        req.user = dbUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "Invalid token",
            statusCode: 401
        });
    }
};

module.exports = authenticateToken;
