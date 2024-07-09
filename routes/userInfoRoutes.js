const express = require('express');
const getUserInfo = require('../controllers/getUserInfo');
const authenticateToken = require('../middlewares/jwtMiddleware');
const router = express.Router();


router.get('/:id', authenticateToken, getUserInfo);



module.exports = router;