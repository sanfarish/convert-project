const account = require('../models/accounts');

exports.getAccounts = async (req, res) => {
	try {
		const data = await account.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getAccount = async (req, res) => {
	try {
		const data = await account.findByID(req.params.id);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.createAccount = async (req, res) => {
	try {
		const body = {
			account_id: crypto.randomUUID(),
			account_name: req.body.account_name,
			account_balance: req.body.account_balance
		};
		await account.create(body);
		res.status(201).json({
			status: 201,
			message: 'accounts data successfully created',
			data: body
		});
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
			message: 'accounts data successfully updated',
			data: {account_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteAccount = async (req, res) => {
	try {
		await account.remove(req.params.id);
		res.status(200).json({
			status: 200,
			message: 'accounts data successfully deleted',
			data: req.params.id
		});
	} catch (err) {console.error(err)};
};