const express = require('express');
const {
    getCongNgheChieu,
    getCongNgheChieuByID
} = require('../controllers/congnghechieu.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/cong_nghe_chieu', getCongNgheChieu); // Fetch all technologies
router.get('/cong_nghe_chieu/:id', getCongNgheChieuByID); // Fetch a technology by ID

module.exports = router;
