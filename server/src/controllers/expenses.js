const expense = require('../models/expenses');
const { expenseRule } = require('../utils/deleteRules');
const user = require('../utils/dummyUser');
const { expenseNameValidation } = require('../utils/nameRules');

exports.getExpenses = async (req, res) => {
	try {
		const data = await expense.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getExpense = async (req, res) => {
	try {
		const data = await expense.findByID(req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createExpense = async (req, res) => {
	try {
		const body = { ...req.body, expense_id: crypto.randomUUID(), ...user.faris() };
		if (!expenseNameValidation(body)) {
			res.status(500).json({
				status: 500,
				message: 'There are already category with that name, change with another unique name!',
				data: body
			});
		} else {
			await expense.create(body);
			res.status(201).json({
				status: 201,
				message: 'Expense data successfully created.',
				data: body
			});
		};
	} catch (err) {console.error(err)};
};

exports.updateExpense = async (req, res) => {
	try {
		const body = {
			expense_name: req.body.expense_name
		}
		await expense.update(req.params.id, body);
		res.status(200).json({
			status: 200,
			message: 'Expense data successfully updated.',
			data: {expense_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteExpense = async (req, res) => {
	try {
		const transactionsData = await expenseRule(req.params.id);
		if (transactionsData.includes(req.params.id)) {
			res.status(500).json({
				status: 500,
				message: 'Cannot delete category that is in use on transactions!',
				data: req.params.id
			});
		} else {
			await expense.remove(req.params.id);
			res.status(200).json({
				status: 200,
				message: 'Expense data successfully deleted.',
				data: req.params.id
			});
		};
	} catch (err) {console.error(err)};
};