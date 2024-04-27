const transactions = require('../models/transactions');

exports.userDelete = async () => {
	try {
		console.log(await transactions.findAll());
	} catch (err) {console.error(err)};
};