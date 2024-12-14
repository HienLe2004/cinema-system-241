const express = require('express');
const {
    getAllChiNhanh,
    getChiNhanhByID
} = require('../controllers/chinhanh.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/chi_nhanh', getAllChiNhanh); // Fetch all ChiNhanh
router.get('/chi_nhanh/:id', getChiNhanhByID); // Fetch a ChiNhanh by ID

module.exports = router;
