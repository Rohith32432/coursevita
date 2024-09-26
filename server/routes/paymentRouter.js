const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments for a user
router.get('/user/:userId', paymentController.getUserPayments);

// Get a specific payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update payment status
router.put('/:id/status', paymentController.updatePaymentStatus);

module.exports = router;
