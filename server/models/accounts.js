/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

//////////////////////
// Models Functions //
//////////////////////
exports.findAll = () => {
    return knex('accounts').select('*').orderBy('account_name', 'asc');
};

exports.findByID = (id) => {
    return knex('accounts').select('*').where('account_id', id);
};

exports.create =  async (body) => {
    await knex('accounts').insert(body);
};

exports.update = async (id, body) => {
    await knex('accounts').where('account_id', id).update(body);
};

exports.remove = async (id) => {
    await knex('accounts').where('account_id', id).del();
};