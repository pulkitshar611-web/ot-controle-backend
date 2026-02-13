import express from 'express';
import * as dataController from '../controllers/dataController.js';

const router = express.Router();

// Clients
router.get('/clients', dataController.getClients);
router.post('/clients', dataController.createClient);
router.put('/clients/:id', dataController.updateClient);
router.delete('/clients/:id', dataController.deleteClient);

// Orders
router.get('/orders', dataController.getOrders);
router.post('/orders', dataController.createOrder);
router.put('/orders/:id', dataController.updateOrder);
router.delete('/orders/:id', dataController.deleteOrder);

// Appointments
router.get('/appointments', dataController.getAppointments);
router.post('/appointments', dataController.createAppointment);
router.put('/appointments/:id', dataController.updateAppointment);
router.delete('/appointments/:id', dataController.deleteAppointment);

export default router;
