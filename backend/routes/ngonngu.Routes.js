const express = require('express');
const {
    getNgonNgu,
    getNgonNguByID
} = require('../controllers/ngonngu.controller');

const router = express.Router();

router.get('/ngon_ngu', getNgonNgu); // Fetch all Ngon Ngu
router.get('/ngon_ngu/:TenNgonNgu/:MaHTC', getNgonNguByID); // Fetch Ngon Ngu by TenNgonNgu and MaHTC

module.exports = router;
