/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);

//////////////////////
// Models Functions //
//////////////////////
exports.findAll = () => {
    return knex('transactions').select(
        knex.raw('transaction_id, transaction_time, id_account, A.account_name, id_income, income_name, id_expense, expense_name, id_transfer, B.account_name AS transfer_name, transaction_amount, transaction_note')
        ).innerJoin(
            knex.raw('accounts A ON transactions.id_account = A.account_id')
        ).innerJoin(
            'category_income', 'transactions.id_income', '=', 'category_income.income_id'
        ).innerJoin(
            'category_expense', 'transactions.id_expense', '=', 'category_expense.expense_id'
        ).innerJoin(
            knex.raw('accounts B ON transactions.id_transfer = B.account_id')
        ).orderBy('transaction_time', 'desc');
};

exports.findByID = (id) => {
    return knex('transactions').select(
        knex.raw('transaction_id, transaction_time, id_account AS id_acc, A.account_name AS id_account, id_income AS id_inc, income_name AS id_income, id_expense AS id_exp, expense_name AS id_expense, id_transfer AS id_tra, B.account_name AS id_transfer, transaction_amount, transaction_note')
        ).innerJoin(
            knex.raw('accounts A ON transactions.id_account = A.account_id')
        ).innerJoin(
            'category_income', 'transactions.id_income', '=', 'category_income.income_id'
        ).innerJoin(
            'category_expense', 'transactions.id_expense', '=', 'category_expense.expense_id'
        ).innerJoin(
            knex.raw('accounts B ON transactions.id_transfer = B.account_id')
        ).where('transaction_id', id);
};

exports.findAllRaw = () => {
    return knex('transactions').select('*').orderBy('transaction_time', 'desc');
};

exports.findByIDRaw = (id) => {
    return knex('transactions').select('*').where('transaction_id', id);
};

exports.create =  async (body) => {
    await knex('transactions').insert(body);
};

exports.update = async (id, body) => {
    await knex('transactions').where('transaction_id', id).update(body);
};

exports.remove = async (id) => {
    await knex('transactions').where('transaction_id', id).del();
};
