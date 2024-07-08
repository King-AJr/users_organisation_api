// createToken.test.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const createToken = require('../utils/createToken'); // Adjust the path to your createToken module

dotenv.config();

test('should create a token with the correct user details and expiration time', () => {
    const userInfo = {
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '1234567890',
        userId: 'user123'
    };

    const token = createToken(userInfo);
    expect(token).not.toBeNull();

    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    expect(decodedToken).toHaveProperty('lastName', userInfo.lastName);
    expect(decodedToken).toHaveProperty('firstName', userInfo.firstName);
    expect(decodedToken).toHaveProperty('email', userInfo.email);
    expect(decodedToken).toHaveProperty('phone', userInfo.phone);
    expect(decodedToken).toHaveProperty('userId', userInfo.userId);

    // Check if the token expires in 30 minutes
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const expirationTime = decodedToken.exp; // Expiration time in seconds
    const expiresIn = expirationTime - currentTime;
    expect(expiresIn).toBeCloseTo(30 * 60, 5); // 30 minutes in seconds with a small margin for processing time
});
