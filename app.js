const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const helmet = require('helmet');

const { JWT_SECRET } = process.env.JWT_SECRET;

module.exports.JWT_SECRET = JWT_SECRET;

const rateLimit = require('express-rate-limit');

const generalError = require('./middlewares/generalError');
const routes = require('./routes/index');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(helmet());

app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, legacyHeaders: false });

app.use(limiter);

app.use(routes);

app.use(errors());
app.use(generalError);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
