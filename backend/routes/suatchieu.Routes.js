const express = require('express');
const {
    getAllSuatChieu,
    getSuatChieuByMaP
} = require('../controllers/suatchieu.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/suat_chieu', getAllSuatChieu);  // Fetch all SuatChieu
router.get('/suat_chieu/:id', getSuatChieuByMaP);  // Fetch SuatChieu by MaP (Phim ID)

module.exports = router;
