const Payment = require('../model/PaymentModel');

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        // console.log(req.body);
        
        const { userId, amount, paymentMethod } = req.body;
 

        const newPayment = new Payment({
            userId,
            amount,
            currency:'inr',
            paymentMethod,
            transactionId: Date.now(),
            status: 'pending' // Initial status
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        console.error('Error creating payment:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Get all payments for a user
exports.getUserPayments = async (req, res) => {
    try {
        const { userId } = req.params;
        const payments = await Payment.find({ userId });
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving user payments:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Get a specific payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error retrieving payment by ID:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error updating payment status:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};
