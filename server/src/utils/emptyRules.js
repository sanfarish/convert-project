const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');
const transaction = require('../models/transactions');

exports.nameEmptyRule = (body) => {
	return (
		typeof body !== 'string'
		|| body === ''
		|| body === null
		|| !body
	);
};

exports.balanceEmptyRule = (body) => {
	return (
		typeof body !== 'number'
		|| !Number.isInteger(body)
		|| body === null
	);
};

exports.transactionEmptyRule = (body) => {
	return(
		!body.transaction_time
		|| !body.id_account
		|| (!body.id_income && !body.id_expense && !body.id_transfer)
		|| !body.transaction_amount
	);
};

exports.expenseIdEmptyRule = async (userid, id) => {
	try {
		const res = await expense.findAll(userid);
		const data = res.some(item => item.expense_id === id);
		return data;
	} catch (err) {console.error(err)};
};

exports.incomeIdEmptyRule = async (userid, id) => {
	try {
		const res = await income.findAll(userid);
		const data = res.some(item => item.income_id === id);
		return data;
	} catch (err) {console.error(err)};
};

exports.accountIdEmptyRule = async (userid, id) => {
	try {
		const res = await account.findAll(userid);
		const data = res.some(item => item.account_id === id);
		return data;
	} catch (err) {console.error(err)};
};

exports.transactionIdEmptyRule = async (userid, id) => {
	try {
		const res = await transaction.findAll(userid);
		const data = res.some(item => item.transaction_id === id);
		return data;
	} catch (err) {console.error(err)};
};