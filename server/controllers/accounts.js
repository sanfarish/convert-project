/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const Account = require('../models/accounts');

//////////////////////
// Get All Accounts //
//////////////////////
exports.getAccounts = async (req, res) => {
    try {
        const data = await Account.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

////////////////////////
// Get Single Account //
////////////////////////
exports.getAccount = async (req, res) => {
    try {
        const data = await Account.findByID(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};

///////////////////////
// Create an Account //
///////////////////////
exports.createAccount = async (req, res) => {
    try {
        const body = {
            account_id: crypto.randomUUID(),
            account_name: req.body.account_name,
            account_balance: req.body.account_balance
        }
        await Account.create(body);
        res.status(201).json({
            status: 201,
            message: 'accounts data successfully created',
            data: body
        });
    } catch (error) {
        console.log(error);
    }
};

///////////////////////
// Update an Account //
///////////////////////
exports.updateAccount = async (req, res) => {
    try {
        const body = {
            account_name: req.body.account_name,
            account_balance: req.body.account_balance
        }
        await Account.update(req.params.id, body);
        res.status(200).json({
            status: 200,
            message: 'accounts data successfully updated',
            data: {account_id: req.params.id, ...body}
        });
    } catch (error) {
        console.log(error);
    }
};

///////////////////////
// Delete an Account //
///////////////////////
exports.deleteAccount = async (req, res) => {
    try {
        await Account.remove(req.params.id);
        res.status(200).json({
            status: 200,
            message: 'accounts data successfully deleted',
            data: req.params.id
        });
    } catch (error) {
        console.log(error);
    }
};