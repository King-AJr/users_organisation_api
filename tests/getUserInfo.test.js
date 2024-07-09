const getUserInfo = require('../controllers/getUserInfo');
const { getRepository } = require('typeorm');
const User = require('../db/entity/User');

jest.mock('typeorm', () => {
    const originalModule = jest.requireActual('typeorm');
    return {
        ...originalModule,
        getRepository: jest.fn(),
    };
});

describe('getUserInfo', () => {
    it('should return 403 if users are not in the same organization', async () => {
        // Mock the request and response objects
        const req = {
            params: { id: '2' },
            user: { userId: 3 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUserRepo = {
            findOne: jest.fn(),
        };

        getRepository.mockReturnValue(mockUserRepo);

        // Mock TypeORM repository responses
        mockUserRepo.findOne
            .mockResolvedValueOnce({
                userId: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '1234567890',
                organisations: [{ id: 1 }],
            })
            .mockResolvedValueOnce({
                userId: 2,
                organisations: [{ id: 2 }],
            });

        // Call the controller
        await getUserInfo(req, res);

        // Assert the response
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            status: "Bad request",
            message: 'Access denied: Users are not in the same organization',
            statusCode: 403,
        });
    });
});
