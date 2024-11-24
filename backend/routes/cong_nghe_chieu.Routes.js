const express = require('express')
const { getCong_nghe_chieu, getCong_nghe_chieuByID, createCong_nghe_chieu, updateCong_nghe_chieuByID, deleteCong_nghe_chieuByID } = require('../controllers/cong_nghe_chieu.controller')

//________________ROUTER_________________
const router = express.Router()

//________________ROUTES_________________
router.get('/cong_nghe_chieu', getCong_nghe_chieu)
router.get('/cong_nghe_chieu/:id', getCong_nghe_chieuByID)
router.post('/cong_nghe_chieu', createCong_nghe_chieu)
router.put('/cong_nghe_chieu/:id', updateCong_nghe_chieuByID)
router.delete('/cong_nghe_chieu/:id', deleteCong_nghe_chieuByID)

module.exports = router