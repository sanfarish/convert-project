const income = require('../models/incomes');
const { incomeNameRule } = require('../utils/nameRules');
const { incomeDelRule } = require('../utils/deleteRules');
const { nameEmptyRule, incomeIdEmptyRule } = require('../utils/emptyRules');

exports.getIncomes = async (req, res) => {
	try {
		const data = await income.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getIncome = async (req, res) => {
	try {
		const data = await income.findByID(req.userid, req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createIncome = async (req, res) => {
	try {
		const emptyCheck = nameEmptyRule(req.body.income_name);
		if (emptyCheck) {
			res.status(400).json({
				message: 'please fill required input with appropriate value'
			});
		} else {
			const body = { income_id: crypto.randomUUID(), id_user: req.userid, income_name: req.body.income_name };
			const nameCheck = await incomeNameRule(req.userid, false, body.income_name);
			if (nameCheck) {
				res.status(500).json({
					message: 'there are already category with that name, change with another unique name',
					data: { income_name: body.income_name }
				});
			} else {
				await income.create(body);
				res.status(201).json({
					message: 'income data successfully created',
					data: { income_id: body.income_id, income_name: body.income_name }
				});
			};
		};
	} catch (err) {console.error(err)};
};

exports.updateIncome = async (req, res) => {
	try {
		const idCheck = await incomeIdEmptyRule(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'there are no income data with requested id',
				data: req.params.id
			});
		} else {
			const emptyCheck = nameEmptyRule(req.body.income_name);
			if (emptyCheck) {
				res.status(400).json({
					message: 'please fill required input with appropriate value'
				});
			} else {
				const body = { income_name: req.body.income_name };
				const nameCheck = await incomeNameRule(req.userid, req.params.id, body.income_name);
				if (nameCheck) {
					res.status(500).json({
						message: 'there are already category with that name, change with another unique name',
						data: { income_name: body.income_name }
					});
				} else {
					await income.update(req.params.id, body);
					res.status(200).json({
						message: 'income data successfully updated',
						data: {income_id: req.params.id, ...body}
					});
				};
			};
		};
	} catch (err) {console.error(err)};
};

exports.deleteIncome = async (req, res) => {
	try {
		const idCheck = await incomeIdEmptyRule(req.userid, req.params.id); 
		if (!idCheck) {
			res.status(400).json({
				message: 'there are no income data with requested id',
				data: req.params.id
			});
		} else {
			const deleteCheck = await incomeDelRule(req.userid, req.params.id);
			if (deleteCheck) {
				res.status(500).json({
					message: 'cannot delete category that is in use on transactions',
					data: req.params.id
				});
			} else {
				await income.remove(req.params.id);
				res.status(200).json({
					message: 'income data successfully deleted'
				});
			};
		};
	} catch (err) {console.error(err)};
};