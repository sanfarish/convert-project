/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const express = require('express');
const router = express.Router();
const Transaction = require('../controllers/transactions')
const Account = require('../controllers/accounts');
const Income = require('../controllers/category-income')
const Expense = require('../controllers/category-expense')

/////////////////////
// Transactions Routes //
/////////////////////
router.get('/transactions', Transaction.getTransactions);
router.get('/transactions/:id', Transaction.getTransaction);
router.get('/transactionsraw', Transaction.getTransactionsRaw)
router.get('/transactionsraw/:id', Transaction.getTransactionRaw)
router.post('/transactions', Transaction.createTransaction);
router.put('/transactions/:id', Transaction.updateTransaction);
router.delete('/transactions/:id', Transaction.deleteTransaction);

/////////////////////
// Accounts Routes //
/////////////////////
router.get('/accounts', Account.getAccounts);
router.get('/accounts/:id', Account.getAccount);
router.post('/accounts', Account.createAccount);
router.put('/accounts/:id', Account.updateAccount);
router.delete('/accounts/:id', Account.deleteAccount);

//////////////////////////////
// Income Categories Routes //
//////////////////////////////
router.get('/categories-income', Income.getIncomeCategories);
router.get('/categories-income/:id', Income.getIncomeCategory);
router.post('/categories-income', Income.createIncomeCategory);
router.put('/categories-income/:id', Income.updateIncomeCategory);
router.delete('/categories-income/:id', Income.deleteIncomeCategory);

///////////////////////////////
// Expense Categories Routes //
///////////////////////////////
router.get('/categories-expense', Expense.getExpenseCategories);
router.get('/categories-expense/:id', Expense.getExpenseCategory);
router.post('/categories-expense', Expense.createExpenseCategory);
router.put('/categories-expense/:id', Expense.updateExpenseCategory);
router.delete('/categories-expense/:id', Expense.deleteExpenseCategory);

module.exports = router;