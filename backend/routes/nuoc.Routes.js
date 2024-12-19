const express = require('express');
const { getAllNuoc } = require('../controllers/nuoc.controller');

const router = express.Router();

// Route to fetch all NUOC
router.get('/nuoc', getAllNuoc);

module.exports = router;
