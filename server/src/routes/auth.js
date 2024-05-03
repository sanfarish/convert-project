const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authentication = require('../controllers/auth');

// development only
router.get('/users', users.getUsers);

router.post('/register', authentication.register);
router.post('/login', authentication.login);

module.exports = router;