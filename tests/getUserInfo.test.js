
const  getUserInfo = require('../controllers/getUserInfo');

jest.mock('../db/prisma');

describe('getUserInfo', () => {
    it('should return 403 if users are not in the same organization', async () => {
        // Mock the request and response objects
        const req = {
            params: { id: '1' },
            user: { userId: 2 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock prisma responses
        prisma.User.findUnique
            .mockResolvedValueOnce({
                userId: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '1234567890',
                organisations: [1],
            })
            .mockResolvedValueOnce({
                userId: 2,
                organisations: [2],
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

    // Additional test cases...
});
