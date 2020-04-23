const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res, next) => {
    res.sendStatus('200');
})

module.exports = app;