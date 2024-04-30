const account = require('../models/accounts');
const { accountNameRule } = require('../utils/nameRules');
const { accountDelRule } = require('../utils/deleteRules');
const { nameEmptyRule, balanceEmptyRule, accountIdEmptyRule } = require('../utils/emptyRules');

exports.getAccounts = async (req, res) => {
	try {
		const data = await account.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getAccount = async (req, res) => {
	try {
		const data = await account.findByID(req.userid, req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createAccount = async (req, res) => {
	try {
		const emptyCheck = nameEmptyRule(req.body.account_name);
		if (emptyCheck) {
			res.status(400).json({
				message: 'please fill required input with appropriate value'
			});
		} else {
			const body = {
				account_id: crypto.randomUUID(),
				id_user: req.userid,
				account_name: req.body.account_name,
				account_balance: 0
			};
			const nameCheck = await accountNameRule(req.userid, false, body.account_name);
			if (nameCheck) {
				res.status(500).json({
					message: 'there are already account with that name, change with another unique name',
					data: { account_name: body.account_name }
				});
			} else {
				await account.create(body);
				res.status(201).json({
					message: 'account data successfully created',
					data: { account_id: body.account_id, account_name: body.account_name }
				});
			};
		};
	} catch (err) {console.error(err)};
};

exports.updateAccount = async (req, res) => {
	try {
		const idCheck = await accountIdEmptyRule(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'there are no account data with requested id',
				data: req.params.id
			});
		} else {
			const emptyCheckName = nameEmptyRule(req.body.account_name);
			const emptyCheckBal = balanceEmptyRule(req.body.account_balance);
			if (emptyCheckName && emptyCheckBal) {
				res.status(400).json({
					message: 'please fill required input with appropriate value'
				});
			} else if (emptyCheckBal) {
				const body = { account_name: req.body.account_name };
				const nameCheck = await accountNameRule(req.userid, req.params.id, req.body.account_name);
				if (nameCheck) {
					res.status(500).json({
						message: 'there are already account with that name, change with another unique name',
						data: { account_name: body.account_name }
					});
				} else {
					await account.update(req.params.id, body);
					res.status(200).json({
						message: 'account data successfully updated',
						data: { account_id: req.params.id, ...body }
					});
				};
			} else if (emptyCheckName) {
				const body = { account_balance: req.body.account_balance };
				await account.update(req.params.id, body);
				res.status(200).json({
					message: 'account data successfully updated.',
					data: { account_id: req.params.id, ...body }
				});
			} else {
				res.status(400).json({
					message: 'only accept http request with one parameter'
				});
			};
		};
	} catch (err) {console.error(err)};
};

exports.deleteAccount = async (req, res) => {
	try {
		const idCheck = await accountIdEmptyRule(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'there are no account data with requested id',
				data: req.params.id
			});
		} else {
			const deleteCheck = await accountDelRule(req.userid, req.params.id);
			if (deleteCheck) {
				res.status(500).json({
					message: 'cannot delete account that is in use on transactions',
					data: req.params.id
				});
			} else {
				await account.remove(req.params.id);
				res.status(200).json({
					message: 'account data successfully deleted'
				});
			};
		};
	} catch (err) {console.error(err)};
};