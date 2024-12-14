const express = require('express');
const {
    getGheByMaPCAndMaCN
} = require('../controllers/ghe.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/ghe/:maPC/:maCN', getGheByMaPCAndMaCN);  // Fetch Ghe by MaPC and MaCN

module.exports = router;
