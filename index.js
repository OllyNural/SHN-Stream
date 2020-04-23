const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express();
app.use(express.json());

const { video } = require('./routes');

const loggerFormat = require('./utils/logger')

// Log errors to console
app.use(morgan(loggerFormat, {
    skip: function (req, res) { return res.statusCode < 400 }
}))

// Log normal access to a log file
app.use(morgan(loggerFormat, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use('/video', video)

app.get('/health', (req, res, next) => res.sendStatus(200));

module.exports = app;