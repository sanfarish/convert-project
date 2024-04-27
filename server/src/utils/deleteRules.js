const transactions = require('../models/transactions');

exports.accountRule = async (id) => {
	try {
		const res = await transactions.findAll();
		const data = res.map(item => item.id_account === id || item.id_transfer === id && item.id_account);
		return data;
	} catch (err) {console.error(err)};
};

exports.incomeRule = async (id) => {
	try {
		const res = await transactions.findAll();
		const data = res.map(item => item.id_income === id && item.id_income);
		return data;
	} catch (err) {console.error(err)};
};

exports.expenseRule = async (id) => {
	try {
		const res = await transactions.findAll();
		const data = res.map(item => item.id_expense === id && item.id_expense);
		return data;
	} catch (err) {console.error(err)};
};