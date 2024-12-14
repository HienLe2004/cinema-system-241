const express = require('express');
const {
    getHinhThucChieu,
    getHinhThucChieuByID
} = require('../controllers/hinhthuc.controller');

const router = express.Router();

router.get('/hinh_thuc_chieu', getHinhThucChieu); // Fetch all Hinh Thuc Chieu
router.get('/hinh_thuc_chieu/:id', getHinhThucChieuByID); // Fetch a Hinh Thuc Chieu by ID

module.exports = router;
