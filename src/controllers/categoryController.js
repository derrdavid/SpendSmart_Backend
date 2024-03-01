const Category = require('../schemas/categorySchema');

// get all Categories
exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// get Category by ID
exports.getOne = (req, res) => {
    try {
        res.status(200).json(res.category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// add Category
exports.addOne = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        color: req.body.color
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// update Category
exports.updateOne = async (req, res) => {
    if (req.body.name == null && req.body.color == null) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    if (req.body.name) {
        res.category.name = req.body.name;
    }
    if (req.body.color) {
        res.category.color = req.body.color;
    }

    // Speichere die aktualisierte Ausgabe in der Datenbank
    try {
        const updatedCategory = await res.category.save();
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// delete Category
exports.deleteOne = async (req, res) => {
    try {
        await Category.deleteOne(res.category);
        res.status(200).json({ message: "deleted category" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Middleware-Function
exports.getCategory = async (req, res, next) => {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.category = category;
    next();
}
