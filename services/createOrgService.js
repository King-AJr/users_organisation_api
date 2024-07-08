
const { emptyFieldsValidate, isItString } = require('../utils/emptyFields');

/**
 * Create a new organisation
 * @param {object} userData - User data from request
 * @param {string} name - Name of the organisation
 * @param {string} description - Description of the organisation
 * @returns {Promise<object>} - Newly created organisation object
 */
const createOrgService = async (userData, name, description) => {
  try {
    // Validate fields
    const fieldsToValidate = [
      { field: 'name', value: name }
    ];

    const validationResult = emptyFieldsValidate(fieldsToValidate);
    const itIsString = isItString([
      { field: 'name', value: name },
      { field: 'description', value: description }
    ]);

    if (validationResult.length > 0 || !itIsString) {
      throw new Error('Validation failed');
    }

    // Default description if not provided
    if (!description) {
      description = `${name}'s organisation`;
    }

    // Create organisation in database
    const newOrganisation = await prisma.organisation.create({
      data: {
        name: name,
        description: description
      }
    });

    return newOrganisation;
  } catch (error) {
    throw new Error(`Failed to create organisation: ${error.message}`);
  }
};

module.exports = createOrgService;