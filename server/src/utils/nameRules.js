const expense = require('../models/expenses');
const income = require('../models/incomes');
const account = require('../models/accounts');

exports.expenseNameRule = async (userid, id, name) => {
	try {
		if (!id) {
			const res = await expense.findAll(userid);
			const data = res.some(item => item.expense_name === name);
			return data;
		} else {
			const res = await expense.findAll(userid);
			const mod = res.map(item => item.expense_id !== id && item.expense_name);
			const data = mod.includes(name);
			return data;
		};
	} catch (err) {console.error(err)};
};

exports.incomeNameRule = async (userid, id, name) => {
	try {
		if (!id) {
			const res = await income.findAll(userid);
			const data = res.some(item => item.income_name === name);
			return data;
		} else {
			const res = await income.findAll(userid);
			const mod = res.map(item => item.income_id !== id && item.income_name);
			const data = mod.includes(name);
			return data;
		};
	} catch (err) {console.error(err)};
};

exports.accountNameRule = async (userid, id, name) => {
	try {
		if (!id) {
			const res = await account.findAll(userid);
			const data = res.some(item => item.account_name === name);
			return data;
		} else {
			const res = await account.findAll(userid);
			const mod = res.map(item => item.account_id !== id && item.account_name);
			const data = mod.includes(name);
			return data;
		};
	} catch (err) {console.error(err)};
};