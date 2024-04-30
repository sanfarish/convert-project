const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('accounts')
	.select('account_id', 'account_name', 'account_balance')
	.where('id_user', userid)
	.orderBy('account_name', 'asc');
};

exports.findByID = (userid, id) => {
	return knex('accounts')
	.select('account_id', 'account_name', 'account_balance')
	.where('id_user', userid)
	.andWhere('account_id', id);
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

exports.removeAll = async (userid) => {
	try {
		await knex('accounts').where('id_user', userid).del();
	} catch (err) {console.error(err)};
};