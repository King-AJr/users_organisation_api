const request = require('supertest');
const server = require('../server');

describe('Organization Access Control', () => {
  it('should allow access to organizations user belongs to', async () => {
    // Simulate authentication and check organization access
    const response = await request(server)
      .get('/api/organizations/1')
      .set('Authorization', `Bearer ${validTokenForUser1}`);

    expect(response.status).toBe(200);
    expect(response.body.organization).toBeDefined();
  });

  it('should deny access to organizations user does not belong to', async () => {
    // Simulate authentication and check organization access
    const response = await request(server)
      .get('/api/organizations/2')
      .set('Authorization', `Bearer ${validTokenForUser1}`);

    expect(response.status).toBe(403);
  });
});

describe('Register Endpoint', () => {
    it('should register user successfully with default organization', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };
  
      const response = await request(server)
        .post('/api/auth/register')
        .send(userData);
  
      expect(response.status).toBe(201);
      expect(response.body.user).toMatchObject({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        defaultOrganization: "John's Organization"
      });
      expect(response.body.accessToken).toBeDefined();
    });
  
    it('should fail if required fields are missing', async () => {
      const incompleteUserData = {
        firstName: 'Jane',
        lastName: 'Smith'
        // Missing email and password
      };
  
      const response = await request(server)
        .post('/api/auth/register')
        .send(incompleteUserData);
  
      expect(response.status).toBe(422);
      expect(response.body.errors).toContain('Email is required');
      expect(response.body.errors).toContain('Password is required');
    });
  
    it('should fail if there is a duplicate email', async () => {
      const duplicateUserData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'john.doe@example.com', // Existing email
        password: 'password123'
      };
  
      const response = await request(server)
        .post('/api/auth/register')
        .send(duplicateUserData);
  
      expect(response.status).toBe(422);
      expect(response.body.message).toBe('Email already exists');
    });
  });
