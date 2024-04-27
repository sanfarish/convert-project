const income = require('../models/incomes');
const { incomeRule } = require('../utils/deleteRules');
const user = require('../utils/dummyUser');
const { incomeNameValidation } = require('../utils/nameRules');

exports.getIncomes = async (req, res) => {
	try {
		const data = await income.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getIncome = async (req, res) => {
	try {
		const data = await income.findByID(req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createIncome = async (req, res) => {
	try {
		const body = {...req.body, income_id: crypto.randomUUID(), ...user.faris() };
		if (!incomeNameValidation(body)) {
			res.status(500).json({
				status: 500,
				message: 'There are already category with that name, change with another unique name!',
				data: body
			});
		} else {
			await income.create(body);
			res.status(201).json({
				status: 201,
				message: 'Income data successfully created.',
				data: body
			});
		};
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
			message: 'Income data successfully updated.',
			data: {income_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteIncome = async (req, res) => {
	try {
		const transactionsData = await incomeRule(req.params.id);
		if (transactionsData.includes(req.params.id)) {
			res.status(500).json({
				status: 500,
				message: 'Cannot delete category that is in use on transactions!',
				data: req.params.id
			});
		} else {
			await income.remove(req.params.id);
			res.status(200).json({
				status: 200,
				message: 'Income data successfully deleted.',
				data: req.params.id
			});
		}
	} catch (err) {console.error(err)};
};