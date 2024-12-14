const express = require('express');
const {
    getTheLoai,
    getTheLoaiByMaP,
    createTheLoai,
    deleteTheLoaiByMaP
} = require('../controllers/theloai.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/the_loai', getTheLoai); // Fetch all genress
router.get('/the_loai/:id', getTheLoaiByMaP); // Fetch genres by Phim ID
router.post('/the_loai', createTheLoai); // Create a new genre for a Phim
router.delete('/the_loai/:id', deleteTheLoaiByMaP); // Delete a genre by Phim ID

module.exports = router;
