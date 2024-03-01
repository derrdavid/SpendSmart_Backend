const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

connectDB();

app.use('/expenses', expenseRoutes);
app.use('/categories', categoryRoutes);
app.use('/budgets', budgetRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening to port: " + process.env.PORT);
})