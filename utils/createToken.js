const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (userInfo) => {
    if (userInfo) {
        let token = jwt.sign(
            {
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
            email: userInfo.email,
            phone: userInfo.phone,
            userId: userInfo.userId
            },
            process.env.APP_SECRET,
            { expiresIn: "30m" }
            );

        return token;
    }

    return null;
}

module.exports = createToken;
    