const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');
const transaction = require('../models/transactions');

exports.emptyName = (body) => {
	return (
		typeof body !== 'string'
		|| body === ''
		|| body === null
		|| !body
	);
};

exports.emptyBalance = (body) => {
	return (
		typeof body !== 'number'
		|| !Number.isInteger(body)
		|| body === null
	);
};

exports.emptyTransaction = (body) => {
	return (
		!body.transaction_time
		|| !body.id_account
		|| (!body.id_income && !body.id_expense && !body.id_transfer)
		|| !body.transaction_amount
	);
};

exports.emptyExpenseId = async (userid, id) => {
	const res = await expense.findAll(userid);
	const data = res.some(item => item.expense_id === id);
	return data;
};

exports.emptyIncomeId = async (userid, id) => {
	const res = await income.findAll(userid);
	const data = res.some(item => item.income_id === id);
	return data;
};

exports.emptyAccountId = async (userid, id) => {
	const res = await account.findAll(userid);
	const data = res.some(item => item.account_id === id);
	return data;
};

exports.emptyTransactionId = async (userid, id) => {
	const res = await transaction.findAll(userid);
	const data = res.some(item => item.transaction_id === id);
	return data;
};