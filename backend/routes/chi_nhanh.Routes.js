const express = require('express');
const { 
    getChiNhanh, 
    getChiNhanhByID, 
    createChiNhanh, 
    updateChiNhanhByID, 
    deleteChiNhanhByID 
} = require('../controllers/chi_nhanh.controller');

//________________ROUTER_________________
const router = express.Router();

//________________ROUTES_________________
router.get('/chi_nhanh', getChiNhanh); // Fetch all branches
router.get('/chi_nhanh/:id', getChiNhanhByID); // Fetch a branch by ID
router.post('/chi_nhanh', createChiNhanh); // Create a new branch
router.patch('/chi_nhanh/:id', updateChiNhanhByID); // Update a branch by ID
router.delete('/chi_nhanh/:id', deleteChiNhanhByID); // Delete a branch by ID

module.exports = router;
