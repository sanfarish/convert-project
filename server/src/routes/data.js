const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const transaction = require('../controllers/transactions');
const account = require('../controllers/accounts');
const income = require('../controllers/incomes');
const expense = require('../controllers/expenses');
const users = require('../controllers/users');

router.get('/transactions', transaction.getTransactions);
router.get('/transactions/:id', transaction.getTransaction);
router.post('/transactions', upload.none(), transaction.createTransaction);
router.put('/transactions/:id', upload.none(), transaction.updateTransaction);
router.delete('/transactions/:id', transaction.deleteTransaction);

router.get('/accounts', account.getAccounts);
router.get('/accounts/:id', account.getAccount);
router.post('/accounts', account.createAccount);
router.put('/accounts/:id', account.updateAccount);
router.delete('/accounts/:id', account.deleteAccount);

router.get('/incomes', income.getIncomes);
router.get('/incomes/:id', income.getIncome);
router.post('/incomes', income.createIncome);
router.put('/incomes/:id', income.updateIncome);
router.delete('/incomes/:id', income.deleteIncome);

router.get('/expenses', expense.getExpenses);
router.get('/expenses/:id', expense.getExpense);
router.post('/expenses', expense.createExpense);
router.put('/expenses/:id', expense.updateExpense);
router.delete('/expenses/:id', expense.deleteExpense);

router.get('/users', users.getUser);
router.put('/users', users.updateUser);
router.delete('/users', users.deleteUser);

module.exports = router;