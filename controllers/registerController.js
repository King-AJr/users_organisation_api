const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const emptyFieldsValidate = require('../utils/emptyFields');
const checkEmailExists = require('../utils/checkEmailExist');
const prisma = require('../db/prisma');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = async (req, res) => {
    const { lastName, firstName, email, password, phone } = req.body;

    // Validate fields using your existing validation function
    const fieldsToValidate = [
        { field: 'lastName', value: lastName },
        { field: 'firstName', value: firstName },
        { field: 'email', value: email },
        { field: 'password', value: password },
    ];

    const validationResult = emptyFieldsValidate(fieldsToValidate);

    if (!validationResult) {
        return res.status(422).json({
            errors: validationResult
        });
    }

    try {
        //check if email is unique
        const emailExists = await checkEmailExists(email, false);
        if (emailExists) {
            return res.status(400).json(
                {
                    "status": "Bad request",
                    "message": "Registration unsuccessful",
                    "statusCode": 400
                }
            )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.User.create({
            data: {
                lastName,
                firstName,
                email,
                password: hashedPassword,
                phone
            }
        });


        const newOrganisation = await prisma.organisation.create({
            data: {
              name: "kumba's Organization",
              description: "Your Organization Description"
            }
          });
          const userId = newUser.userId;
          await prisma.UserOrganisation.create({
            data: {
              userId: userId,
              organisationId: newOrganisation.orgId
            }
          });

        let token = jwt.sign(
            {
              lastName: newUser.lastName,
              firstName: newUser.firstName,
              email: newUser.email,
              phone: newUser.phone,
              userId: newUser.userId
            },
            process.env.APP_SECRET,
            { expiresIn: "3 days" }
          );


        return res.status(201).json({
            "status": "success",
            "message": "Registration successful",
            "data": {
              "accessToken": token,
              "user": {
                  "userId": `${newUser.userId}`,
                  "firstName": `${newUser.firstName}`,
                        "lastName": `${newUser.lastName}`,
                        "email": `${newUser.email}`,
                        "phone": `${newUser.phone}`,
              }
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).json(
            {
                "status": "Bad request",
                "message": "Registration unsuccessful",
                "statusCode": 400
            }
        )
    }
};

module.exports = registerUser;
