const express = require('express');
const {
    GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN
} = require('../controllers/ghedadatcuasc.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/ghe-da-dat/:maSC/:maPC/:maCN', GetGheDaDatCuaSCByMaSCAndMaPCAndMaCN);  // Fetch Ghe Da Dat Cua SC by MaSC, MaPC, MaCN

module.exports = router;
