const Expense = require('../schemas/expenseSchema');

// get all expenses
exports.getAll = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getByYear = async (req, res) => {
    const year = req.params.year;
    if (year.length != 4) {
        return res.status(400).json({ message: "Invalid Year provided." });
    }
    try {
        const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
        const endOfYear = new Date(`${year}-12-31T23:59:59Z`);

        const expenses = await Expense.find({
            date: {
                $gte: startOfYear,
                $lt: endOfYear
            }
        }).populate('category');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get expense by month and year
exports.getByDate = async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;

    if (month < 0 || month > 12) {
        return res.status(400).json({ message: "Invalid Date provided." });
    }

    // monate fangen bei 0 an
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    try {
        const expenses = await Expense.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate('category');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get expense by id
exports.getOne = (req, res) => {
    try {
        res.json(res.expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add expense
exports.addOne = async (req, res) => {
    const expense = new Expense({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        date: req.body.date
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// edit expense
exports.updateOne = async (req, res) => {
    // Überprüfe, ob req.body Daten enthält, die aktualisiert werden sollen
    if (!req.body.name && !req.body.category && !req.body.price) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    // Aktualisiere die Felder der Ausgabe mit den neuen Daten aus req.body
    if (req.body.name) {
        res.expense.name = req.body.name;
    }
    if (req.body.category) {
        res.expense.category = req.body.category;
    }
    if (req.body.price) {
        res.expense.price = req.body.price;
    }

    // Speichere die aktualisierte Ausgabe in der Datenbank
    try {
        const updatedExpense = await res.expense.save();
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// delete expense
exports.deleteOne = async (req, res) => {
    try {
        await Expense.deleteOne(res.expense);
        res.status(200).json({ message: "deleted expense" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteMany = async (req, res) => {
    const ids = req.body.ids;

    // Überprüfen, ob die Anforderung gültige Daten enthält
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid request. Please provide a non-empty array of IDs.' });
    }

    try {
        const result = await Expense.deleteMany({ _id: { $in: ids } });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting items:', error);
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
}


exports.getExpense = async (req, res, next) => {
    let expense;
    try {
        expense = await Expense.findById(req.params.id).populate('category');
        if (expense == null) {
            return res.status(404).json({ message: 'Cannot find expense' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.expense = expense;
    next();
}

exports.swap = async (req, res) => {
    try {
        // Überprüfen, ob die Anforderung gültige Daten enthält
        if (!req.body.item1 || !req.body.item2) {
            return res.status(400).json({ message: 'Invalid request. Please provide item1 and item2.' });
        }

        const itemOne = await Expense.findById(req.body.item1);
        const itemTwo = await Expense.findById(req.body.item2);

        // Überprüfen, ob die angeforderten Elemente vorhanden sind
        if (!itemOne || !itemTwo) {
            return res.status(404).json({ message: 'One or both expenses not found.' });
        }

        // Tauschen der Daten
        const tempName = itemOne.name;
        const tempCategory = itemOne.category;
        const tempPrice = itemOne.price;

        itemOne.name = itemTwo.name;
        itemOne.category = itemTwo.category;
        itemOne.price = itemTwo.price;

        itemTwo.name = tempName;
        itemTwo.category = tempCategory;
        itemTwo.price = tempPrice;

        // Speichern der aktualisierten Elemente
        await itemOne.save();
        await itemTwo.save();

        // Rückgabe der aktualisierten Elemente
        res.status(200).json({ itemOne, itemTwo });
    } catch (error) {
        // Fehlerbehandlung
        console.error("Error swapping expenses:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
