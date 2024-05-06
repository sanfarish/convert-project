const transactions = require('../models/transactions');
const fs = require('fs');

exports.deleteUpload = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
		console.log(`${path} was deleted`);
	});
};

exports.deletePath = async (userid, id) => {
	const res = await transactions.findByID(userid, id);
	if (res.transaction_bill !== '') {
		return res.transaction_bill;
	} else {
		return false;
	};
};