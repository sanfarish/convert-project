const transaction = require('../models/transactions');
const { transactionEmptyRule, transactionIdEmptyRule } = require('../utils/emptyRules');
const { multipleRule, bodyAppend, addBalance, removeBalance, idAccountRule, idExpenseRule, idIncomeRule } = require('../utils/transactionRules');

exports.getTransactions = async (req, res) => {
	try {
		const data = await transaction.findAll(req.userid);
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getTransaction = async (req, res) => {
	try {
		const data = await transaction.findByID(req.userid, req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createTransaction = async (req, res) => {
	try {
		const emptyCheck = transactionEmptyRule(req.body);
		if (emptyCheck) {
			res.status(400).json({
				message: 'please fill required input with appropriate value'
			});
		} else {
			const crossCheck = multipleRule(req.body);
			if (crossCheck) {
				res.status(400).json({
					message: 'only accept one type of transaction either income, expense, or transfer'
				});
			} else {
				const idAccountCheck = await idAccountRule(req.userid, req.body.id_account);
				const idIncomeCheck = await idIncomeRule(req.userid, req.body.id_income);
				const idExpenseCheck = await idExpenseRule(req.userid, req.body.id_expense);
				const idTransferCheck = await idAccountRule(req.userid, req.body.id_transfer);
				if (!idAccountCheck || !idIncomeCheck || !idExpenseCheck || !idTransferCheck) {
					res.status(400).json({
						message: 'there are no account and / or category data with requested id'
					});
				} else {
					if (req.body.id_account === req.body.id_transfer) {
						res.status(500).json({
							status: 500,
							message: '"from" account and "to" account cannot be the same',
							data: { id_account: req.body.id_account, id_transfer: req.body.id_transfer }
						});
					} else {
						const body = {
							transaction_id: crypto.randomUUID(),
							id_user: req.userid,
							transaction_time: req.body.transaction_time,
							id_account: req.body.id_account,
							transaction_amount: Number(req.body.transaction_amount),
							transaction_note: req.body.transaction_note
						};
						const newBody = bodyAppend(req.body, body);
						await addBalance(req.userid, newBody);
						await transaction.create(newBody);
						delete newBody.id_user;
						res.status(201).json({
							status: 201,
							message: 'transaction data successfully created',
							data: newBody
						});
					};
				};
			};
		};
	} catch (err) {console.error(err)};
};

exports.updateTransaction = async (req, res) => {
	try {
		const idCheck = await transactionIdEmptyRule(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'There are no transaction data with requested id!',
				data: req.params.id
			});
		} else {
			const emptyCheck = transactionEmptyRule(req.body);
			if (emptyCheck) {
				res.status(400).json({
					message: 'please fill required input with appropriate value'
				});
			} else {
				const crossCheck = multipleRule(req.body);
				if (crossCheck) {
					res.status(400).json({
						message: 'only accept one type of transaction either income, expense, or transfer'
					});
				} else {
					const idAccountCheck = await idAccountRule(req.userid, req.body.id_account);
					const idIncomeCheck = await idIncomeRule(req.userid, req.body.id_income);
					const idExpenseCheck = await idExpenseRule(req.userid, req.body.id_expense);
					const idTransferCheck = await idAccountRule(req.userid, req.body.id_transfer);
					if (!idAccountCheck || !idIncomeCheck || !idExpenseCheck || !idTransferCheck) {
						res.status(400).json({
							message: 'there are no account and / or category data with requested id'
						});
					} else {
						if (req.body.id_account === req.body.id_transfer) {
							res.status(500).json({
								status: 500,
								message: '"from" account and "to" account cannot be the same',
								data: { id_account: req.body.id_account, id_transfer: req.body.id_transfer }
							});
						} else {
							const body = {
								transaction_time: req.body.transaction_time,
								id_account: req.body.id_account,
								transaction_amount: Number(req.body.transaction_amount),
								transaction_note: req.body.transaction_note
							};
							const newBody = bodyAppend(req.body, body);
							await removeBalance(req.userid, req.params.id);
							await addBalance(req.userid, newBody);
							await transaction.update(req.params.id, newBody);
							res.status(200).json({
								status: 200,
								message: 'transaction data successfully updated',
								data: { transaction_id: req.params.id, ...newBody }
							});
						};
					};
				};
			};
		};
	} catch (err) {console.error(err)};
};

exports.deleteTransaction = async (req, res) => {
	try {
		const idCheck = await transactionIdEmptyRule(req.userid, req.params.id);
		if (!idCheck) {
			res.status(400).json({
				message: 'there are no transaction data with requested id',
				data: req.params.id
			});
		} else {
			await removeBalance(req.userid, req.params.id);
			await transaction.remove(req.params.id);
			res.status(200).json({
				status: 200,
				message: 'transaction data successfully deleted',
				data: req.params.id
			});
		};
	} catch (err) {console.error(err)};
};