/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const Expense = require('../models/category-expense');

////////////////////////
// Get All Categories //
////////////////////////
exports.getExpenseCategories = async (req, res) => {
    try {
        const data = await Expense.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    };
};

/////////////////////////
// Get Single Category //
/////////////////////////
exports.getExpenseCategory = async (req, res) => {
    try {
        const data = await Expense.findByID(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Create a Category //
///////////////////////
exports.createExpenseCategory = async (req, res) => {
    try {
        const body = {
            expense_id: crypto.randomUUID(),
            expense_name: req.body.expense_name
        }
        await Expense.create(body);
        const data = await Expense.findAll();
        res.status(201).json({
            status: 201,
            message: 'category_expense data successfully created',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Update a Category //
///////////////////////
exports.updateExpenseCategory = async (req, res) => {
    try {
        const body = {
            expense_name: req.body.expense_name
        }
        await Expense.update(req.params.id, body);
        const data = await Expense.findAll();
        res.status(200).json({
            status: 200,
            message: 'category_expense data successfully updated',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Delete a Category //
///////////////////////
exports.deleteExpenseCategory = async (req, res) => {
    try {
        await Expense.remove(req.params.id);
        const data = await Expense.findAll();
        res.status(200).json({
            status: 200,
            message: 'category_expense data successfully deleted',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};