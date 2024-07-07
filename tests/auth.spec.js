const jwt = require('jsonwebtoken');
const request = require('supertest');
const server = require('../server');

describe('Token Generation', () => {
  it('should generate a valid token with correct user details', async () => {
    const user = { userId: 1, email: 'user@example.com' };
    const token = jwt.sign(user, process.env.APP_SECRET, { expiresIn: '1h' });

    // Verify token
    const response = await request(server)
      .get('/api/test')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual(user);
  });

  it('should fail to authenticate with an expired token', async () => {
    const user = { userId: 1, email: 'user@example.com' };
    const expiredToken = jwt.sign(user, process.env.APP_SECRET, { expiresIn: '-1s' });

    // Verify expired token
    const response = await request(server)
      .get('/api/test')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
  });
});
