const express = require('express');
const {
    getKhachHangDanhGiaPhimByMaP,
    createKhachHangDanhGiaPhimByMaP,
    updateKhachHangDanhGiaPhimByMaP,
    deleteKhachHangDanhGiaPhimByMaPAndMaKH
} = require('../controllers/danhgia.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/danh_gia/:id', getKhachHangDanhGiaPhimByMaP); // Fetch KH_DG_PHIM by Phim ID
router.post('/danh_gia/:id', createKhachHangDanhGiaPhimByMaP); // Create a new KH_DG_PHIM for a Phim
router.patch('/danh_gia/:id', updateKhachHangDanhGiaPhimByMaP); // Update KH_DG_PHIM for a Phim
router.delete('/danh_gia/:MaP/:MaKH', deleteKhachHangDanhGiaPhimByMaPAndMaKH); // Delete a KH_DG_PHIM by Phim ID

module.exports = router;
