const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    paymentMethod: { type: String, required: true},
    transactionId: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

// Export the Payment model
module.exports = mongoose.model('Payment', paymentSchema);
