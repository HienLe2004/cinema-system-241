const express = require('express');
const {
    getDienVien,
    getDienVienByMaP,
    createDienVien,
    updateDienVienByMaP,
    deleteDienVienByMaP
} = require('../controllers/dienvien.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/dien_vien', getDienVien); // Fetch all actors
router.get('/dien_vien/:id', getDienVienByMaP); // Fetch actors by Phim ID
router.post('/dien_vien', createDienVien); // Create a new actor for a Phim
router.patch('/dien_vien/:id', updateDienVienByMaP); // Update an actor's info by Phim ID
router.delete('/dien_vien/:id', deleteDienVienByMaP); // Delete an actor by Phim ID

module.exports = router;
