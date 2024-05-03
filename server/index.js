require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const data = require('./src/routes/data');
const auth = require('./src/routes/auth');
const { authorization, notFound } = require('./src/middlewares');

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (err) {
            res.status(400).json({
                message: `invalid JSON, ${err.message}`
            });
        };
    }
}));
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', auth);

app.use(authorization);

app.use('/api/v1', data);

app.use(notFound);

const port = process.env.PORT || 3500;
app.listen(port, process.env.HOST || 'localhost', () => console.log("Expense Manager API Server running on port", port));