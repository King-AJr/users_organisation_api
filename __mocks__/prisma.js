const prisma = {
  User: {
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
  },
  organisation: {
      findUnique: jest.fn(),
      create: jest.fn(),
  },
};

module.exports = prisma;