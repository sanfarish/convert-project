/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const Transaction = require('../models/transactions');

//////////////////////////
// Get All Transactions //
//////////////////////////
exports.getTransactions = async (req, res) => {
    try {
        const data = await Transaction.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

////////////////////////////
// Get Single Transaction //
////////////////////////////
exports.getTransaction = async (req, res) => {
    try {
        const data = await Transaction.findByID(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

////////////////////////////////
// Get All Transactions (RAW) //
////////////////////////////////
exports.getTransactionsRaw = async (req, res) => {
    try {
        const data = await Transaction.findAllRaw();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

//////////////////////////////////
// Get Single Transaction (RAW) //
//////////////////////////////////
exports.getTransactionRaw = async (req, res) => {
    try {
        const data = await Transaction.findByIDRaw(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

//////////////////////////
// Create a Transaction //
//////////////////////////
exports.createTransaction = async (req, res) => {
    try {
        const body = {
            transaction_id: crypto.randomUUID(),
            transaction_time: req.body.transaction_time,
            id_account: req.body.id_account,
            id_income: req.body.id_income,
            id_expense: req.body.id_expense,
            id_transfer: req.body.id_transfer,
            transaction_amount: req.body.transaction_amount,
            transaction_note: req.body.transaction_note
        };
        await Transaction.create(body);
        const data = await Transaction.findAll();
        res.status(201).json({
            status: 201,
            message: 'transactions data successfully created',
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};

//////////////////////////
// Update a Transaction //
//////////////////////////
exports.updateTransaction = async (req, res) => {
    try {
        const body = {
            transaction_time: req.body.transaction_time,
            id_account: req.body.id_account,
            id_income: req.body.id_income,
            id_expense: req.body.id_expense,
            id_transfer: req.body.id_transfer,
            transaction_amount: req.body.transaction_amount,
            transaction_note: req.body.transaction_note
        };
        await Transaction.update(req.params.id, body);
        const data = await Transaction.findAll();
        res.status(200).json({
            status: 200,
            message: 'transaction data successfully updated',
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};

//////////////////////////
// Delete a Transaction //
//////////////////////////
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.remove(req.params.id);
        const data = await Transaction.findAll();
        res.status(200).json({
            status: 200,
            message: 'transactions data successfully deleted',
            data: data
        });
    } catch (error) {
        console.log(error);
    }
};