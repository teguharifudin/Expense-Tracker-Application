const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'IDR' 
    },
    date: {
        // type: Date,
        // default: Date.now
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;