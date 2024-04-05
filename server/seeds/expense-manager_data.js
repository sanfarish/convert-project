/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del();
  await knex('accounts').del();
  await knex('category_income').del();
  await knex('category_expense').del();
  await knex('category_expense').insert([
    {expense_id: '', expense_name: ''},
    {expense_id: '9749ed15-b5c9-49ad-b7d1-3fb44aae95af', expense_name: 'Hobi'},
    {expense_id: '297e1d19-9988-43f5-a29e-e76121a279ff', expense_name: 'Kebutuhan Rumah'},
    {expense_id: '9c3b186b-063b-4ae3-b0ea-32aeb0f93cf8', expense_name: 'Makan'},
    {expense_id: '8b95e41a-e36d-4263-8981-5bbe0692fb11', expense_name: 'Orang Tua'},
    {expense_id: 'ed1a5774-5ffb-4b69-bb23-29f37758f29a', expense_name: 'Sedekah'},
    {expense_id: '65e11036-3720-497e-9b2a-25f8b2a92ae4', expense_name: 'Transport'}
  ]);
  await knex('category_income').insert([
    {income_id: '', income_name: ''},
    {income_id: '90074426-86b8-478d-8921-1241f0810729', income_name: 'Dropship'},
    {income_id: '5332816f-aa42-4abc-988e-c508a8cfe114', income_name: 'Gaji'},
    {income_id: '2f2b29f2-71aa-4a3c-86f9-e48fa1b32aff', income_name: 'Reseller'},
    {income_id: '8c72b31b-208c-4423-8eb9-a98e14c2d552', income_name: 'Sewa Ruko'},
    {income_id: '32c1ae51-a98d-4824-955e-3d1e691ae2ac', income_name: 'Upah Freelance'}
  ]);
  await knex('accounts').insert([
    {account_id: '', account_name: '', account_balance: 0},
    {account_id: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0', account_name: 'BNI', account_balance: 4200000},
    {account_id: '281f1213-d4a9-4973-8b1d-aab19e795c39', account_name: 'Cash', account_balance: 500000},
    {account_id: 'fe8ead11-b175-4f01-abd7-2c76ba27441f', account_name: 'E-Money', account_balance: 0},
    {account_id: '353eac86-ae83-4d28-aec7-f08c40ef80b4', account_name: 'Gopay', account_balance: 0},
    {account_id: '02cc7c37-2481-4cee-901c-516402113e6b', account_name: 'Hutang', account_balance: -1300000},
    {account_id: 'd75d8fe3-a984-4318-9f6c-ca7699501e93', account_name: 'Mandiri', account_balance: 0},
    {account_id: '1aa35acc-33b4-4770-aa32-fba0511a41eb', account_name: 'Shopeepay', account_balance: 0}
  ]);
  await knex('transactions').insert([
    {
      transaction_id: 'e863441a-0e53-4671-9dae-2625fb7b4873',
      transaction_time: '2024-03-01T06:00',
      id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
      id_income: '5332816f-aa42-4abc-988e-c508a8cfe114',
      id_expense: '',
      id_transfer: '',
      transaction_amount: 6500000,
      transaction_note: 'Gaji pertama sebagai software engineer'
    },
    {
      transaction_id: 'a567ca38-c0c3-4de5-bbe1-baa53b3f5253',
      transaction_time: '2024-03-01T11:30',
      id_account: 'a60700eb-b1dd-4b12-ac6e-c1b459511bf0',
      id_income: '',
      id_expense: '',
      id_transfer: '281f1213-d4a9-4973-8b1d-aab19e795c39',
      transaction_amount: 800000,
      transaction_note: 'Tarik tunai buat pegangan cash'
    },
    {
      transaction_id: '131189c7-a5a7-42da-98d9-4abc1ab5dff0',
      transaction_time: '2024-03-02T18:30',
      id_account: '281f1213-d4a9-4973-8b1d-aab19e795c39',
      id_income: '',
      id_expense: '9c3b186b-063b-4ae3-b0ea-32aeb0f93cf8',
      id_transfer: '',
      transaction_amount: 300000,
      transaction_note: 'Traktiran selesai kontrak dari freelance drafter'
    },
    {
      transaction_id: 'c65d054e-9d53-4bfd-a19f-f0b22bb0bf96',
      transaction_time: '2024-03-03T07:00',
      id_account: '02cc7c37-2481-4cee-901c-516402113e6b',
      id_income: '',
      id_expense: '65e11036-3720-497e-9b2a-25f8b2a92ae4',
      id_transfer: '',
      transaction_amount: 1300000,
      transaction_note: 'Minjem rekan buat pesawat pulang'
    }
  ]);
};
