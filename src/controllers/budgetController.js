const Budget = require('../schemas/budgetSchema');

// get
exports.getAll = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ date: 1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByYear = async (req, res) => {
    const year = req.params.year;
    if (year.length != 4) {
        return res.status(400).json({ message: "Invalid Year provided." });
    }

    try {
        const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
        const endOfYear = new Date(`${year}-12-31T23:59:59Z`);
        const result = await Budget.find({
            date: {
                $gte: startOfYear,
                $lt: endOfYear
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// put
exports.updateOne = async (req, res) => {
    if (req.body.amount == null && req.body.date == null) {
        return res.status(400).json({ message: "No data provided for update" });
    }
    if (req.body.amount) {
        res.budget.amount = req.body.amount;
    }
    if (req.body.date) {
        res.budget.date = req.body.date;
    }

    try {
        const updatedBudget = await res.budget.save();
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// post
exports.addOne = async (req, res) => {
    const budget = new Budget({
        amount: req.body.amount,
        date: req.body.date
    })
    try {
        const newBudget = await budget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// delete
exports.deleteOne = async (req, res) => {
    try {
        await Budget.deleteOne(res.budget);
        res.status(200).json({ message: "deleted category" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Middleware-Function
exports.getBudget = async (req, res, next) => {
    let budget;
    try {
        budget = await Budget.findById(req.params.id);
        if (budget == null) {
            return res.status(404).json({ message: 'Cannot find budget.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.budget = budget;
    next();
}
