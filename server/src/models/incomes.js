const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('incomes')
	.select('income_id', 'id_user', 'income_name')
	.innerJoin('users', 'incomes.id_user', '=', 'users.user_id')
	.orderBy('income_name', 'asc');
};

exports.findByID = (id) => {
	return knex('incomes')
	.select('income_id', 'id_user', 'income_name')
	.innerJoin('users', 'incomes.id_user', '=', 'users.user_id')
	.where('income_id', id);
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