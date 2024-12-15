const express = require('express');
const {createVe} = require("../controllers/ve.controller")

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________ư
router.post('/ve/:MaSC/:MaPC/:MaCN', createVe); // Create Ve by  MaSC, MaPC, MaCN

module.exports = router;
