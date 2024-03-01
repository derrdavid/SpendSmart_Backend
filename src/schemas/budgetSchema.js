const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema(
    {
        amount: { type: Number, default: 0},
        date: { type: Date, required: true, unique: true }
    }
);

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;