const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.findAll = () => {
	return knex('users').select('*').orderBy('user_name', 'asc');
};

exports.findByID = (userid) => {
	return knex('users').select('*').where('user_id', userid);
};

exports.create =  async (body) => {
	try {
		await knex('users').insert(body);
	} catch (err) {console.error(err)};
};

exports.update = async (userid, body) => {
	try {
		await knex('users').where('user_id', userid).update(body);
	} catch (err) {console.error(err)};
};

exports.remove = async (userid) => {
	try {
		await knex('users').where('user_id', userid).del();
	} catch (err) {console.error(err)};
};