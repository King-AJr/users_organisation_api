const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkEmailExists = require('../utils/checkEmailExist');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginController = async (req, res) => {

const { email, password } = req.body;

//retrieve user info from db via email
const userInfo = await checkEmailExists(email, true);
    try {

        //compare password with db password
        let isMatch = await bcrypt.compare(password, userInfo.password);

        //if password matches, create a token and send it back to the client
        if(isMatch) {
            let token = jwt.sign(
                {
                lastName: userInfo.lastName,
                firstName: userInfo.firstName,
                email: userInfo.email,
                phone: userInfo.phone,
                userId: userInfo.userId
                },
                process.env.APP_SECRET,
                { expiresIn: "1 minute" }
                );
        

                return res.status(201).json({
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                    "accessToken": token,
                    "user": {
                        "userId": `${userInfo.userId}`,
                        "firstName": `${userInfo.firstName}`,
                                "lastName": `${userInfo.lastName}`,
                                "email": `${userInfo.email}`,
                                "phone": `${userInfo.phone}`,
                    }
                    }
                });

            } else {
                return res.status(401).json(
                    {
                        "status": "Bad request",
                        "message": "Authentication failed",
                        "statusCode": 401
                    }
                )
            }
        }catch (error) {
                console.error('Error creating user:', error);
                return res.status(400).json(
                    {
                        "status": "Bad request",
                        "message": "Authentication failed",
                        "statusCode": 400
                    }
                )
            }
    }

module.exports = loginController