const express = require('express');
const {
    getAllSuatChieu,
    getSuatChieuByMaP,
    createSuatChieu,
    deleteSuatChieu,
    updateSuatChieu
} = require('../controllers/suatchieu.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/suat_chieu', getAllSuatChieu);  // Fetch all SuatChieu
router.get('/suat_chieu/:id', getSuatChieuByMaP);  // Fetch SuatChieu by MaP (Phim ID)
router.get('/suat_chieu', createSuatChieu) // Create a new SuatChieu
router.get('suatchieu/:id', updateSuatChieu) // Update SuatChieu by MaP
router.get('/suat_chieu/:id', deleteSuatChieu); //Delete SuatChieu by MaP

module.exports = router;
