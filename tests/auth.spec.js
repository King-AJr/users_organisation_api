const request = require('supertest');
const app = require('../server');
const prisma = require('../db/prisma');

describe('POST /auth/register', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    afterEach(async () => {
        // Clean up the database after each test
        await prisma.User.deleteMany({});
        await prisma.organisation.deleteMany({});
    });

    it('Should Register User Successfully with Default Organisation', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Registration successful');
        expect(response.body.data.user).toHaveProperty('firstName', 'John');
        expect(response.body.data.user).toHaveProperty('lastName', 'Doe');
        expect(response.body.data.user).toHaveProperty('email', 'john.doe@example.com');
        expect(response.body.data.user).toHaveProperty('phone', '1234567890');
        expect(response.body.data).toHaveProperty('accessToken');

        // Check if the default organisation was created
        const org = await prisma.organisation.findFirst({
            where: { name: "John's Organisation" },
        });
        expect(org).not.toBeNull();
    });

    it('Should Log the user in successfully', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            });

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'jane.doe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body.data.user).toHaveProperty('email', 'jane.doe@example.com');
        expect(response.body.data).toHaveProperty('accessToken');
    });

    it('Should Fail If Required Fields Are Missing', async () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'password'];

        for (const field of requiredFields) {
            const payload = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            };
            delete payload[field];

            const response = await request(app).post('/auth/register').send(payload);
            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('status', 'Bad request');
            expect(response.body).toHaveProperty('message', 'Registration unsuccessful');
        }
    });

    it('Should Fail if there’s Duplicate Email or UserID', async () => {
        const userPayload = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            phone: '1234567890'
        };

        await request(app).post('/auth/register').send(userPayload);

        const response = await request(app).post('/auth/register').send(userPayload);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('status', 'Bad request');
        expect(response.body).toHaveProperty('message', 'Registration unsuccessful');
    });
});
