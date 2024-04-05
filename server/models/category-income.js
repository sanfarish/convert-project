/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

//////////////////////
// Models Functions //
//////////////////////
exports.findAll = () => {
    return knex('category_income').select('*').orderBy('income_name', 'asc');
};

exports.findByID = (id) => {
    return knex('category_income').select('*').where('income_id', id);
};

exports.create =  async (body) => {
    await knex('category_income').insert(body);
};

exports.update = async (id, body) => {
    await knex('category_income').where('income_id', id).update(body);
};

exports.remove = async (id) => {
    await knex('category_income').where('income_id', id).del();
};