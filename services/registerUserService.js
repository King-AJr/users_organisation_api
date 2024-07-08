const bcrypt = require("bcrypt");
const { getRepository } = require("typeorm");
const checkEmailExists = require('../utils/checkEmailExist');
const createToken = require('../utils/createToken');
const { emptyFieldsValidate, isItString } = require('../utils/emptyFields');
const isEmail = require('../utils/validateEmail');
const User = require("../db/entity/User");
const organisation = require("../db/entity/organisations");

/**
 * Registers a new user
 * @param {Object} userData - User data from the request body
 * @returns {Promise<Object>} - New user information and access token
 * @throws {Error} - Throws error if registration fails
 */
const registerUserService = async (userData) => {
  const { lastName, firstName, email, password, phone } = userData;

  // Validate fields
  const fieldsToValidate = [
    { field: 'lastName', value: lastName },
    { field: 'firstName', value: firstName },
    { field: 'email', value: email },
    { field: 'password', value: password },
  ];

  const checkType = [
    { field: 'lastName', value: lastName },
    { field: 'firstName', value: firstName },
    { field: 'email', value: email },
    { field: 'password', value: password },
    { field: 'phone', value: phone },
  ];

  const validationResult = emptyFieldsValidate(fieldsToValidate);
  const validEmail = isEmail(email);
  const itIsString = isItString(checkType);

  if (validationResult.length > 0 || !validEmail || itIsString === false) {
    throw new Error('Invalid input fields');
  }

  // Check if email is already used
  const emailExists = await checkEmailExists(email, false);
  if (emailExists) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const userRepository = getRepository(User);
  const organisationRepository = getRepository(organisation);

  // Create new organisation
  const newOrganisation = organisationRepository.create({
    name: `${firstName} Organisation`,
    description: `${firstName} Organisation`
  });

  await organisationRepository.save(newOrganisation);

  // Create new user and associate with the organisation
  const newUser = userRepository.create({
    lastName,
    firstName,
    email,
    password: hashedPassword,
    phone,
    organisations: [newOrganisation]
  });

  await userRepository.save(newUser);

  console.log(newUser);

  const token = createToken(newUser);

  return {
    accessToken: token,
    user: {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
    }
  };
};

module.exports = registerUserService;