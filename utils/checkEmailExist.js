const prisma = require('../db/prisma')

const checkEmailExists = async (email, full) => {
    try {
        const user = await prisma.User.findFirst({
            where: {
                email: email
            }
        });

        if (full) {
            return user;
        }

        return !!user; // Converts user object to boolean (true if user exists, false if null)
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
};

module.exports = checkEmailExists;
