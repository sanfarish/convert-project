/////////////////////////////////////
// Modules & Variables Declaration //
/////////////////////////////////////
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');
const port = 3500;
const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
};

/////////////////
// Middlewares //
/////////////////
app.use(express.json());
app.use(cors());
app.use(logger);

///////////
// Route //
///////////
app.use('/api/v1', router)

/////////////////
// 404 Handler //
/////////////////
app.use(function (req, res, next) {
    res.status(404).json({
        status: 404,
        errors: 'not found'
    });
});

////////////
// Server //
////////////
app.listen(port, 'localhost', () => console.log("Expense Manager API Server running on port", port));