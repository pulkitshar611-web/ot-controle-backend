import express from 'express';
import * as geminiController from '../controllers/geminiController.js';

const router = express.Router();

// Define Routes
router.post('/insight', geminiController.getBusinessInsight);
router.post('/suggest-service', geminiController.suggestServiceDescription);
router.get('/greeting', geminiController.getGreeting);

export default router;
