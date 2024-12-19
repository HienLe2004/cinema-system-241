const express = require('express');
const { getAllDoMuaKem } = require('../controllers/domuakem.controller');

const router = express.Router();

// Route to fetch all DO_MUA_KEM
router.get('/do_mua_kem', getAllDoMuaKem);

module.exports = router;
