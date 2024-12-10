const express = require('express');
const {
    getTheLoai,
    getTheLoaiByFilmID,
    createTheLoai,
    deleteTheLoaiByID
} = require('../controllers/theloai.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/the_loai', getTheLoai); // Fetch all genres
router.get('/the_loai/film/:id', getTheLoaiByFilmID); // Fetch genres by film ID
router.post('/the_loai', createTheLoai); // Create a new genre for a film
router.delete('/the_loai/:id', deleteTheLoaiByID); // Delete a genre by film ID

module.exports = router;
