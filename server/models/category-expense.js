/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

//////////////////////
// Models Functions //
//////////////////////
exports.findAll = () => {
    return knex('category_expense').select('*').orderBy('expense_name', 'asc');
};

exports.findByID = (id) => {
    return knex('category_expense').select('*').where('expense_id', id);
};

exports.create =  async (body) => {
    await knex('category_expense').insert(body);
};

exports.update = async (id, body) => {
    await knex('category_expense').where('expense_id', id).update(body);
};

exports.remove = async (id) => {
    await knex('category_expense').where('expense_id', id).del();
};