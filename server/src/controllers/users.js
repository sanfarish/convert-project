const users = require('../models/users');

exports.getUsers = async (req, res) => {
	try {
		const data = await users.findAll();
		res.status(200).send(data);
	} catch (err) {console.error(err)};
};

exports.getUser = async (req, res) => {
	try {
		const data = await users.findByID(req.params.id);
		res.status(200).send(data[0]);
	} catch (err) {console.error(err)};
};

exports.createUser = async (req, res) => {
	try {
		const body = {
			user_id: crypto.randomUUID(),
			user_admin: req.body.user_admin,
			user_name: req.body.user_name
		};
		await users.create(body);
		res.status(201).json({
			status: 201,
			message: 'user data successfully created',
			data: body
		});
	} catch (err) {console.error(err)};
};

exports.updateUser = async (req, res) => {
	try {
		const body = {
			user_admin: req.body.user_admin,
			user_name: req.body.user_name
		};
		await users.update(req.params.id, body);
		res.status(200).json({
			status: 200,
			message: 'user data successfully updated',
			data: {user_id: req.params.id, ...body}
		});
	} catch (err) {console.error(err)};
};

exports.deleteUser = async (req, res) => {
	try {
		await users.remove(req.params.id);
		res.status(200).json({
			status: 200,
			message: 'user data successfully deleted',
			data: req.params.id
		});
	} catch (err) {console.error(err)};
};