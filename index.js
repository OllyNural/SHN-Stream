const express = require('express');
const app = express();

const { video } = require('./routes');

app.use(express.json());

app.use('/video', video)

app.get('/health', (req, res, next) => res.sendStatus(200));

module.exports = app;