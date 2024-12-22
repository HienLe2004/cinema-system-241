const express = require('express');
const { 
    getVeCoDoMuaKemByMaV, 
    createVeCoDoMuaKem 
} = require('../controllers/vecodomuakem.controller');

const router = express.Router();
router.get('/ve_co_do_mua_kem/:maV', getVeCoDoMuaKemByMaV);
router.post('/ve_co_do_mua_kem', createVeCoDoMuaKem);

module.exports = router;
