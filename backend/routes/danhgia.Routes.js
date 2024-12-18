const express = require('express');
const {
    getKhachHangDanhGiaPhimByMaP,
    createKhachHangDanhGiaPhim,
    deleteKhachHangDanhGiaPhimByMaP
} = require('../controllers/danhgia.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/danh_gia/:id', getKhachHangDanhGiaPhimByMaP); // Fetch KH_DG_PHIM by Phim ID
router.post('/danh_gia', createKhachHangDanhGiaPhim); // Create a new KH_DG_PHIM for a Phim
router.delete('/danh_gia/:id', deleteKhachHangDanhGiaPhimByMaP); // Delete a KH_DG_PHIM by Phim ID

module.exports = router;
