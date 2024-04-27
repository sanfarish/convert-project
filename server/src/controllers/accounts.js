const account = require('../models/accounts');
const { accountRule } = require('../utils/deleteRules');
const user = require('../utils/dummyUser');
const { accountNameValidation } = require('../utils/nameRules');

exports.getAccounts = async (req, res) => {
	try {
		const data = await account.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getAccount = async (req, res) => {
	try {
		const data = await account.findByID(req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createAccount = async (req, res) => {
	try {
		const body = { ...req.body, account_id: crypto.randomUUID(), account_balance: 0, ...user.faris() };
		if (!accountNameValidation(body)) {
			res.status(500).json({
				status: 500,
				message: 'There are already account with that name, change with another unique name!',
				data: body
			});
		} else {
			await account.create(body);
			res.status(201).json({
				status: 201,
				message: 'Accounts data successfully created.',
				data: body
			});
		};
	} catch (err) {console.error(err)};
};

exports.updateAccount = async (req, res) => {
	try {
		const body = {
			account_name: req.body.account_name,
			account_balance: req.body.account_balance
		};
		await account.update(req.params.id, body);
		res.status(200).json({
			status: 200,
			message: 'Accounts data successfully updated.',
			data: {account_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteAccount = async (req, res) => {
	try {
		const transactionsData = await accountRule(req.params.id);
		if (transactionsData.includes(req.params.id)) {
			res.status(500).json({
				status: 500,
				message: 'Cannot delete account that is in use on transactions!',
				data: req.params.id
			});
		} else {
			await account.remove(req.params.id);
			res.status(200).json({
				status: 200,
				message: 'Accounts data successfully deleted.',
				data: req.params.id
			});
		}
	} catch (err) {console.error(err)};
};