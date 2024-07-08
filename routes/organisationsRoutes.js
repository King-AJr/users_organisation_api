const express = require('express');
const getUserOrganizations = require('../controllers/getUsersOrganisation')
const authenticateToken = require('../middlewares/jwtMiddleware');
const addUserToOrganisation = require('../controllers/addUserToOrganisation');
const createOrganisation = require('../controllers/createOrganisation');
const getSingleOrganisation = require('../controllers/getSingleOrganisation');
const router = express.Router();


router.get('/organisations', authenticateToken, getUserOrganizations);
router.post('/organisations', authenticateToken, createOrganisation);
router.post('/organisations/:orgId/users', authenticateToken, addUserToOrganisation);
router.get('/organisations/:orgId', authenticateToken, getSingleOrganisation);


module.exports = router;