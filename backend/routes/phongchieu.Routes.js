const express = require('express');
const {
    getPhongChieu,
    getPhongChieuByMaCN
} = require('../controllers/phongchieu.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/phong_chieu', getPhongChieu);  // Fetch all PhongChieu
router.get('/phong_chieu/:id', getPhongChieuByMaCN);  // Fetch PhongChieu by MaCN

module.exports = router;
