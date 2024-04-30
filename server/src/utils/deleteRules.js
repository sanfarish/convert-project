const user = require('../models/users');
const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');
const transaction = require('../models/transactions');

exports.deleteAll = async (userid) => {
	try {
		await transaction.removeAll(userid);
		await account.removeAll(userid);
		await income.removeAll(userid);
		await expense.removeAll(userid);
		await user.remove(userid);
	} catch (err) {console.error(err)};
};

exports.expenseDelRule = async (userid, id) => {
	try {
		const res = await transaction.findAll(userid);
		const data = res.some(item => item.id_expense === id);
		return data;
	} catch (err) {console.error(err)};
};

exports.incomeDelRule = async (userid, id) => {
	try {
		const res = await transaction.findAll(userid);
		const data = res.some(item => item.id_income === id);
		return data;
	} catch (err) {console.error(err)};
};

exports.accountDelRule = async (userid, id) => {
	try {
		const res = await transaction.findAll(userid);
		const data = res.some(item => item.id_account === id || item.id_transfer === id);
		return data;
	} catch (err) {console.error(err)};
};