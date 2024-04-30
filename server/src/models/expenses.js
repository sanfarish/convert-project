const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('expenses')
	.select('expense_id', 'expense_name')
	.where('id_user', userid)
	.orderBy('expense_name', 'asc');
};

exports.findByID = (userid, id) => {
	return knex('expenses')
	.select('expense_id', 'expense_name')
	.where('id_user', userid)
	.andWhere('expense_id', id);
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

exports.removeAll = async (userid) => {
	try {
		await knex('expenses').where('id_user', userid).del();
	} catch (err) {console.error(err)};
};