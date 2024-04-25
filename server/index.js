const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');
const logger = (req, res, next) => {
	console.log(req.method, req.url);
	next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);

app.use('/api/v1', router)

app.use((req, res, next) => {
	res.status(404).json({
		status: 404,
		errors: 'not found'
	});
});

const port = 3500;
app.listen(port, 'localhost', () => console.log("Expense Manager API Server running on port", port));