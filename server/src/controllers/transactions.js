const transaction = require('../models/transactions');
const user = require('../utils/dummyUser');
const { addBalance, removeBalance } = require('../utils/transactionRules');

exports.getTransactions = async (req, res) => {
	try {
		const data = await transaction.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getTransaction = async (req, res) => {
	try {
		const data = await transaction.findByID(req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createTransaction = async (req, res) => {
	try {
		const transaction_amount = Number(req.body.transaction_amount);
		const body = {...req.body, transaction_id: crypto.randomUUID(), transaction_amount, ...user.faris()};
		await transaction.create(body);
		await addBalance(body);
		res.status(201).json({
			status: 201,
			message: 'transactions data successfully created',
			data: body
		});
	} catch (err) {console.error(err)};
};

exports.updateTransaction = async (req, res) => {
	try {
		'id_user' in req.body && delete req.body.id_user;
		await transaction.update(req.params.id, req.body);
		await removeBalance(req.params.id);
		await addBalance(body);
		res.status(200).json({
			status: 200,
			message: 'transaction data successfully updated',
			data: {transaction_id: req.params.id, ...req.body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteTransaction = async (req, res) => {
	try {
		await transaction.remove(req.params.id);
		await removeBalance(req.params.id);
		res.status(200).json({
			status: 200,
			message: 'transactions data successfully deleted',
			data: req.params.id
		});
	} catch (err) {console.error(err)};
};