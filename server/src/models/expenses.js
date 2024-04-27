const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('expenses')
	.select('expense_id', 'id_user', 'expense_name')
	.innerJoin('users', 'expenses.id_user', '=', 'users.user_id')
	.orderBy('expense_name', 'asc');
};

exports.findByID = (id) => {
	return knex('expenses')
	.select('expense_id', 'id_user', 'expense_name')
	.innerJoin('users', 'expenses.id_user', '=', 'users.user_id')
	.where('expense_id', id);
};

exports.create =  async (body) => {
	try {
		await knex('expenses').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (id, body) => {
	try {
		await knex('expenses').where('expense_id', id).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (id) => {
	try {
		await knex('expenses').where('expense_id', id).del();
	} catch (err) {console.error(err)};
};