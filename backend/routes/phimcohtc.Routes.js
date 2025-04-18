const express = require('express');
const {
    getPhimCoHTC,
    getPhimCoHTCByMaP
} = require('../controllers/phimcohtc.controller');

const router = express.Router();

router.get('/phim_co_htc', getPhimCoHTC); // Fetch all Phim Co HTC
router.get('/phim_co_htc/:MaP', getPhimCoHTCByMaP); // Fetch Phim Co HTC by MaP and MaHTC

module.exports = router;
