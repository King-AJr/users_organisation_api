const express = require('express');
const registerUser = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginController);



module.exports = router;