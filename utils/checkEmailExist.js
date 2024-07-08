const { getRepository } = require("typeorm");
const User = require("../db/entity/User");

const checkEmailExists = async (email, full) => {
    try {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (full) {
            return user;
        }

        return !!user; 
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
};

module.exports = checkEmailExists;
