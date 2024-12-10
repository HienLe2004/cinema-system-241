const express = require('express');
const {
    getPhim,
    getPhimByID,
    createPhim,
    updatePhimByID,
    deletePhimByID
} = require('../controllers/phim.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/phim', getPhim); // Fetch all films
router.get('/phim/:id', getPhimByID); // Fetch a film by ID
router.post('/phim', createPhim); // Create a new film
router.patch('/phim/:id', updatePhimByID); // Update a film by ID
router.delete('/phim/:id', deletePhimByID); // Delete a film by ID

module.exports = router;
