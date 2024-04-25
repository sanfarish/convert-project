const expense = require('../models/expenses');

exports.getExpenses = async (req, res) => {
	try {
		const data = await expense.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getExpense = async (req, res) => {
	try {
		const data = await expense.findByID(req.params.id);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.createExpense = async (req, res) => {
	try {
		const body = {
			expense_id: crypto.randomUUID(),
			id_user: req.body.id_user,
			expense_name: req.body.expense_name
		};
		await expense.create(body);
		res.status(201).json({
			status: 201,
			message: 'expenses data successfully created',
			data: body
		});
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
			message: 'expenses data successfully updated',
			data: {expense_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteExpense = async (req, res) => {
	try {
		await expense.remove(req.params.id);
		res.status(200).json({
			status: 200,
			message: 'expenses data successfully deleted',
			data: req.params.id
		});
	} catch (err) {console.error(err)};
};