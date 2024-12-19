const express = require('express');
const { getVeCoDoMuaKemByMaV } = require('../controllers/vecodomuakem.controller');

const router = express.Router();

// Route to fetch VE_CO_DO_MUA_KEM by MaV
router.get('/ve_co_do_mua_kem/:maV', getVeCoDoMuaKemByMaV);

module.exports = router;
