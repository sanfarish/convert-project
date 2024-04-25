const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('accounts')
	.select('account_id', 'id_user', 'user_name', 'account_name', 'account_balance')
	.innerJoin('users', 'accounts.id_user', '=', 'users.user_id')
	.orderBy('account_name', 'asc');
};

exports.findByID = (id) => {
	return knex('accounts')
	.select('account_id', 'id_user', 'user_name', 'account_name', 'account_balance')
	.innerJoin('users', 'accounts.id_user', '=', 'users.user_id')
	.where('account_id', id);
};

exports.create =  async (body) => {
	try {
		await knex('accounts').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (id, body) => {
	try {
		await knex('accounts').where('account_id', id).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (id) => {
	try {
		await knex('accounts').where('account_id', id).del();
	} catch (err) {console.error(err)};
};