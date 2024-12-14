const express = require('express');
const {
    getAllPCChieuCNC,
    getPCChieuCNCByMaPCAndMaCN
} = require('../controllers/pcchieucnc.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/pcchieucnc', getAllPCChieuCNC);  // Fetch all PCChieuCNC
router.get('/pcchieucnc/:MaPC/:MaCN', getPCChieuCNCByMaPCAndMaCN);  // Fetch PCChieuCNC by MaPC and MaCN

module.exports = router;
