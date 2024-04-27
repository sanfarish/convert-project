const accounts = require('../models/accounts');
const transactions = require('../models/transactions');

const balanceFinder = async (id) => {
	try {
		const data = await accounts.findByID(id);
		return data[0].account_balance;
	} catch (err) {console.error(err)};
};

const transactionFinder = async (id) => {
	try {
		const data = await transactions.findByID(id);
		return data[0];
	} catch (err) {console.error(err)};
};

exports.addBalance = async (body) => {
	try {
		if (body.id_income) {
			const accountBalance = await balanceFinder(body.id_account);
			await accounts.update(body.id_account, {account_balance: accountBalance + body.transaction_amount});
		} else if (body.id_expense) {
			const accountBalance = await balanceFinder(body.id_account);
			await accounts.update(body.id_account, {account_balance: accountBalance - body.transaction_amount});
		} else if (body.id_transfer) {
			const accountBalance = await balanceFinder(body.id_account);
			const transferBalance = await balanceFinder(body.id_transfer);
			await accounts.update(body.id_account, {account_balance: accountBalance - body.transaction_amount});
			await accounts.update(body.id_transfer, {account_balance: transferBalance + body.transaction_amount});
		};
	} catch (err) {console.error(err)};
};

exports.removeBalance = async (id) => {
	try {
		const data = await transactionFinder(id);
		if (data.id_income !== '') {
			const accountBalance = await balanceFinder(data.id_account);
			await accounts.update(data.id_account, {account_balance: accountBalance - data.transaction_amount});
		} else if (data.id_expense !== '') {
			const accountBalance = await balanceFinder(data.id_account);
			await accounts.update(data.id_account, {account_balance: accountBalance + data.transaction_amount});
		} else if (data.id_transfer !== '') {
			const accountBalance = await balanceFinder(data.id_account);
			const transferBalance = await balanceFinder(data.id_transfer);
			await accounts.update(data.id_account, {account_balance: accountBalance + data.transaction_amount});
			await accounts.update(data.id_transfer, {account_balance: transferBalance - data.transaction_amount});
		};
	} catch (err) {console.error(err)};
};