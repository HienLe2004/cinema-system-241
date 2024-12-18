const express = require('express');
const {
    getTaiKhoan
} = require('../controllers/login.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.post('/login', getTaiKhoan); // Fetch account

module.exports = router;
