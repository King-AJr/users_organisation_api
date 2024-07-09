const request = require('supertest');
const app = require('../server');
const { createConnection, getConnection, getRepository } = require('typeorm');
const User = require('../db/entity/User');
const organisation = require('../db/entity/organisations');

jest.setTimeout(20000);

describe('POST /auth/register', () => {
    beforeAll(async () => {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, organisation],
            synchronize: true,
        });
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    });

    afterEach(async () => {
        // Clean up the database after each test
        const userRepository = getRepository(User);
        const organisationRepository = getRepository(organisation);
        await userRepository.delete({});
        await organisationRepository.delete({});
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
        const organisationRepository = getRepository(Organisation);
        const org = await organisationRepository.findOne({ where: { name: "John's Organisation" } });
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
