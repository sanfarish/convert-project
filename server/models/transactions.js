const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('transactions')
	.select(knex.raw('transaction_id, transactions.id_user, user_name, transaction_time, id_account, A.account_name, id_income, income_name, id_expense, expense_name, id_transfer, B.account_name AS transfer_name, transaction_amount, transaction_note'))
	.innerJoin('users', 'transactions.id_user', '=', 'users.user_id')
	.innerJoin(knex.raw('accounts A ON transactions.id_account = A.account_id'))
	.innerJoin('incomes', 'transactions.id_income', '=', 'incomes.income_id')
	.innerJoin('expenses', 'transactions.id_expense', '=', 'expenses.expense_id')
	.innerJoin(knex.raw('accounts B ON transactions.id_transfer = B.account_id'))
	.orderBy('transaction_time', 'desc');
};

exports.findByID = (id) => {
	return knex('transactions')
	.select(knex.raw('transaction_id, transactions.id_user, user_name, transaction_time, id_account, A.account_name, id_income, income_name, id_expense, expense_name, id_transfer, B.account_name AS transfer_name, transaction_amount, transaction_note'))
	.innerJoin('users', 'transactions.id_user', '=', 'users.user_id')
	.innerJoin(knex.raw('accounts A ON transactions.id_account = A.account_id'))
	.innerJoin('incomes', 'transactions.id_income', '=', 'incomes.income_id')
	.innerJoin('expenses', 'transactions.id_expense', '=', 'expenses.expense_id')
	.innerJoin(knex.raw('accounts B ON transactions.id_transfer = B.account_id'))
	.where('transaction_id', id);
};

exports.create =  async (body) => {
	try {
		await knex('transactions').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (id, body) => {
	try {
		await knex('transactions').where('transaction_id', id).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (id) => {
	try {
		await knex('transactions').where('transaction_id', id).del();
	} catch (err) {console.error(err)};
};