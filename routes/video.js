const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    // Check number of sessions
    // If allowed, add one to session, and continue
    // If not, send back some error code

    // Code for sending video back would go here? Probably?

    // Once finished sending back video, remove from session

    res.sendStatus('200');
})

module.exports = router;
