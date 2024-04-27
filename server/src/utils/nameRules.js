const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');

exports.expenseNameValidation = async (body) => {
	try {
		const res = await expense.findAll();
		const data = res.map(item => item.expense_name);
		return data.includes(body.expense_name) ? false : true;
	} catch (err) {console.error(err)};
};

exports.incomeNameValidation = async (body) => {
	try {
		const res = await income.findAll();
		const data = res.map(item => item.income_name);
		return data.includes(body.income_name) ? false : true;
	} catch (err) {console.error(err)};
};

exports.accountNameValidation = async (body) => {
	try {
		const res = await account.findAll();
		const data = res.map(item => item.account_name);
		return data.includes(body.account_name) ? false : true;
	} catch (err) {console.error(err)};
};