exports.logger = (req, res, next) => {
	console.log(req.method, req.url, req.get('Authorization'));
	next();
};

exports.auth = (req, res, next) => {
	if (req.get('Authorization') === 'Bearer Faris') {
		req.userid = '08b680c7-3c47-485c-ba81-cf58821cbd7c';
		next();
	} else if (req.get('Authorization') === 'Bearer Mariana') {
		req.userid = 'a43e0896-1f23-478c-9bce-130889686ef4';
		next();
	} else if (req.get('Authorization') === 'Bearer Test') {
		res.status(200).json({
			message: 'auth test success'
		});
	} else {
		res.status(401).json({
			message: 'authorization key required'
		});
	};
};

exports.notFound = ((req, res, next) => {
	res.status(404).json({
		message: 'not found'
	});
});