const express = require('express');
const getUserOrganizations = require('../controllers/getUsersOrganisation')
const authenticateToken = require('../middlewares/jwtMiddleware');
const addUserToOrganisation = require('../controllers/addUserToOrganisation')
const router = express.Router();


router.get('/organisations', authenticateToken, getUserOrganizations);
router.post('/organisations/:orgId/users', authenticateToken, addUserToOrganisation)


module.exports = router;