const express = require('express');
const {
    getDaoDien,
    getDaoDienByMaP,
    createDaoDien,
    updateDaoDienByMaP,
    deleteDaoDienByMaP
} = require('../controllers/daodien.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/dao_dien', getDaoDien); // Fetch all directors
router.get('/dao_dien/:id', getDaoDienByMaP); // Fetch directors by Phim ID
router.post('/dao_dien', createDaoDien); // Create a new director for a Phim
router.patch('/dao_dien/:id', updateDaoDienByMaP); // Update a director's info by Phim ID
router.delete('/dao_dien/:id', deleteDaoDienByMaP); // Delete a director by Phim ID

module.exports = router;
