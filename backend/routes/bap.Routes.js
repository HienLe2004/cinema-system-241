const express = require('express');
const { getAllBap } = require('../controllers/bap.controller');

const router = express.Router();

// Route to fetch all BAP
router.get('/bap', getAllBap);

module.exports = router;
