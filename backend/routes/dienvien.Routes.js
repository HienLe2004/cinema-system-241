const express = require('express');
const {
    getDienVien,
    getDienVienByFilmID,
    createDienVien,
    updateDienVienByFilmID,
    deleteDienVienByFilmID
} = require('../controllers/dienvien.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/dien_vien', getDienVien); // Fetch all actors
router.get('/dien_vien/film/:id', getDienVienByFilmID); // Fetch actors by film ID
router.post('/dien_vien', createDienVien); // Create a new actor for a film
router.patch('/dien_vien/:id', updateDienVienByFilmID); // Update an actor's info by film ID
router.delete('/dien_vien/:id', deleteDienVienByFilmID); // Delete an actor by film ID

module.exports = router;
