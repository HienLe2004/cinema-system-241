const express = require('express')
const { getCong_nghe_chieu, getCong_nghe_chieuByID, createCong_nghe_chieu } = require('../controllers/cong_nghe_chieu.controller')

//________________ROUTER_________________
const router = express.Router()

//________________ROUTES_________________
router.get('/cong_nghe_chieu', getCong_nghe_chieu)
router.get('/cong_nghe_chieu/:id', getCong_nghe_chieuByID)
router.post('/cong_nghe_chieu', createCong_nghe_chieu)

module.exports = router