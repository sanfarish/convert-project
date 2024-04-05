/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const Income = require('../models/category-income');

////////////////////////
// Get All Categories //
////////////////////////
exports.getIncomeCategories = async (req, res) => {
    try {
        const data = await Income.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    };
};

/////////////////////////
// Get Single Category //
/////////////////////////
exports.getIncomeCategory = async (req, res) => {
    try {
        const data = await Income.findByID(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Create a Category //
///////////////////////
exports.createIncomeCategory = async (req, res) => {
    try {
        const body = {
            income_id: crypto.randomUUID(),
            income_name: req.body.income_name
        }
        await Income.create(body);
        const data = await Income.findAll();
        res.status(201).json({
            status: 201,
            message: 'category_income data successfully created',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Update a Category //
///////////////////////
exports.updateIncomeCategory = async (req, res) => {
    try {
        const body = {
            income_name: req.body.income_name
        }
        await Income.update(req.params.id, body);
        const data = await Income.findAll();
        res.status(200).json({
            status: 200,
            message: 'category_income data successfully updated',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};

///////////////////////
// Delete a Category //
///////////////////////
exports.deleteIncomeCategory = async (req, res) => {
    try {
        await Income.remove(req.params.id);
        const data = await Income.findAll();
        res.status(200).json({
            status: 200,
            message: 'category_income data successfully deleted',
            data: data
        });
    } catch (error) {
        console.log(error);
    };
};