const users = require('../models/users');
const { deleteUserData } = require('../utils/deleteRules');
const { catchError } = require('../utils/errorCatch');

// development only
exports.getUsers = async (req, res) => {
	try {
		const data = await users.findAll();
		res.status(200).send(data);
	} catch (err) {catchError(err, res)};
};

exports.getUser = async (req, res) => {
	try {
		const data = await users.findByID(req.userid);
		res.status(200).send(data[0]);
	} catch (err) {catchError(err, res)};
};

exports.updateUser = async (req, res) => {
	try {
		const body = {
			user_name: req.body.user_name,
			user_email: req.body.user_email,
			user_password: req.body.user_password
		};
		await users.update(req.userid, body);
		res.status(200).json({
			message: 'user data successfully updated',
			data: body
		});
	} catch (err) {catchError(err, res)};
};

exports.deleteUser = async (req, res) => {
	try {
		await deleteUserData(req.userid);
		await users.remove(req.userid);
		res.status(200).json({
			message: 'user successfully deleted'
		});
	} catch (err) {catchError(err, res)};
};