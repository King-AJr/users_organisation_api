const jwt = require('jsonwebtoken');
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

describe('Token Generation', () => {
  it('should generate a valid token with correct user details and expiration time (Registration)', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890'
    };

    // Register the user
    const registrationResponse = await request(server)
      .post('/auth/register')
      .send(newUser);

    expect(registrationResponse.status).toBe(201);

    // Extract token from registration response
    const token = registrationResponse.body.data.accessToken;

    // Verify token
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    // Assertions
    expect(decoded.firstName).toBe(newUser.firstName);
    expect(decoded.lastName).toBe(newUser.lastName);
    expect(decoded.email).toBe(newUser.email);
    expect(decoded.phone).toBe(newUser.phone);
    expect(decoded.userId).toBeDefined();
    expect(decoded.exp).toBeDefined(); // Token should have an expiration time
  });

  it('should generate a valid token with correct user details (Login)', async () => {
    const existingUser = {
      email: 'jane.doe@example.com',
      password: 'password123'
    };

    // Login the user
    const loginResponse = await request(server)
      .post('/auth/login')
      .send(existingUser);

    expect(loginResponse.status).toBe(201);

    // Extract token from login response
    const token = loginResponse.body.data.accessToken;

    // Verify token
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    // Assertions
    expect(decoded.firstName).toBeDefined();
    expect(decoded.lastName).toBeDefined();
    expect(decoded.email).toBe(existingUser.email);
    expect(decoded.userId).toBeDefined();
    expect(decoded.exp).toBeDefined(); // Token should have an expiration time
  });

  it('should fail to authenticate with an expired token', async () => {
    const expiredToken = 'invalid_token'; // This should be an expired token

    // Attempt to access a protected route with expired token
    const response = await request(server)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token expired');
  });
});
