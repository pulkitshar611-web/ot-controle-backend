const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

// Define Routes
router.post('/insight', geminiController.getBusinessInsight);
router.post('/suggest-service', geminiController.suggestServiceDescription);
router.get('/greeting', geminiController.getGreeting);

module.exports = router;
