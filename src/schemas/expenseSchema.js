const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: Number,
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;