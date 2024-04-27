const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('users').select('*').orderBy('user_name', 'asc');
};

exports.findByID = (id) => {
	return knex('users').select('*').where('user_id', id);
};

exports.create =  async (body) => {
	try {
		await knex('users').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (id, body) => {
	try {
		await knex('users').where('user_id', id).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (id) => {
	try {
		await knex('users').where('user_id', id).del();
	} catch (err) {console.error(err)};
};