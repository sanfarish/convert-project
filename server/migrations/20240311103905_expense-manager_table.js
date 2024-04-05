/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.dropTableIfExists('transactions')
  .dropTableIfExists('accounts')
  .dropTableIfExists('category_income')
  .dropTableIfExists('category_expense')
  .createTable('category_expense', (table) => {
      table.string('expense_id', 36).notNullable().primary();
      table.string('expense_name', 50).notNullable();
  })
  .createTable('category_income', (table) => {
      table.string('income_id', 36).notNullable().primary();
      table.string('income_name', 50).notNullable();
  })
  .createTable('accounts', (table) => {
      table.string('account_id', 36).notNullable().primary();
      table.string('account_name', 50).notNullable();
      table.integer('account_balance').notNullable();
  })
  .createTable('transactions', (table) => {
      table.string('transaction_id', 36).notNullable().primary();
      table.timestamp('transaction_time').notNullable();
      table.string('id_account', 36).notNullable();
      table.string('id_income', 36).notNullable();
      table.string('id_expense', 36).notNullable();
      table.string('id_transfer', 36).notNullable();
      table.integer('transaction_amount').notNullable();
      table.string('transaction_note', 50).notNullable();
      table.foreign('id_account').references('account_id').inTable('accounts');
      table.foreign('id_income').references('income_id').inTable('category_income');
      table.foreign('id_expense').references('expense_id').inTable('category_expense');
      table.foreign('id_transfer').references('account_id').inTable('accounts');
  })
  .then( () => {
    return knex('category_expense').insert([
      {expense_id: '', expense_name: ''}
    ]);
  })
  .then( () => {
    return knex('category_income').insert([
      {income_id: '', income_name: ''}
    ])
  })
  .then( () => {
    return knex('accounts').insert([
      {account_id: '', account_name: '', account_balance: 0}
    ]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transactions')
  .dropTableIfExists('accounts')
  .dropTableIfExists('category_income')
  .dropTableIfExists('category_expense');
};
