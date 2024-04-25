const income = require('../models/incomes');

exports.getIncomes = async (req, res) => {
	try {
		const data = await income.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getIncome = async (req, res) => {
	try {
		const data = await income.findByID(req.params.id);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.createIncome = async (req, res) => {
	try {
		const body = {
			income_id: crypto.randomUUID(),
			income_name: req.body.income_name
		};
		await income.create(body);
		res.status(201).json({
			status: 201,
			message: 'incomes data successfully created',
			data: body
		});
	} catch (err) {console.error(err)};
};

exports.updateIncome = async (req, res) => {
	try {
		const body = {
			income_name: req.body.income_name
		};
		await income.update(req.params.id, body);
		res.status(200).json({
			status: 200,
			message: 'incomes data successfully updated',
			data: {income_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteIncome = async (req, res) => {
	try {
		await income.remove(req.params.id);
		res.status(200).json({
			status: 200,
			message: 'incomes data successfully deleted',
			data: req.params.id
		});
	} catch (err) {console.error(err)};
};