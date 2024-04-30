const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/routes');
const { logger, auth, notFound } = require('./src/middlewares');

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
app.use(logger);
app.use(auth);

app.use('/api/v1', router)

app.use(notFound);

const port = 3500;
app.listen(port, 'localhost', () => console.log("Expense Manager API Server running on port", port));