const express = require('express');
const { getAllQuaLuuNiem } = require('../controllers/qualuuniem.controller');

const router = express.Router();

// Route to fetch all QUA_LUU_NIEM
router.get('/qua_luu_niem', getAllQuaLuuNiem);

module.exports = router;
