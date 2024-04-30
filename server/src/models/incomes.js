const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = (userid) => {
	return knex('incomes')
	.select('income_id', 'income_name')
	.where('id_user', userid)
	.orderBy('income_name', 'asc');
};

exports.findByID = (userid, id) => {
	return knex('incomes')
	.select('income_id', 'income_name')
	.where('id_user', userid)
	.andWhere('income_id', id);
};

exports.create =  async (body) => {
	try {
		await knex('incomes').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (id, body) => {
	try {
		await knex('incomes').where('income_id', id).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (id) => {
	try {
		await knex('incomes').where('income_id', id).del();
	} catch (err) {console.error(err)};
};

exports.removeAll = async (userid) => {
	try {
		await knex('incomes').where('id_user', userid).del();
	} catch (err) {console.error(err)};
};