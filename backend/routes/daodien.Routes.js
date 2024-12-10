const express = require('express');
const {
    getDaoDien,
    getDaoDienByFilmID,
    createDaoDien,
    updateDaoDienByID,
    deleteDaoDienByID
} = require('../controllers/daodien.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/dao_dien', getDaoDien); // Fetch all directors
router.get('/dao_dien/film/:id', getDaoDienByFilmID); // Fetch directors by film ID
router.post('/dao_dien', createDaoDien); // Create a new director for a film
router.patch('/dao_dien/:id', updateDaoDienByID); // Update a director's info by film ID
router.delete('/dao_dien/:id', deleteDaoDienByID); // Delete a director by film ID

module.exports = router;
