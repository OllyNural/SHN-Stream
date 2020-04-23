const express = require('express');
const router = express.Router();

const MAX_STREAMS = 3;

const { Users } = require('../models');

// 
router.get('/', async (req, res, next) => {
    const userID = req.header('x-user-id');

    if (!userID) return res.sendStatus(401)

    // Check number of sessions
    const currentUserStreams = await Users.getStreamsByIdJson(userID);
    if (currentUserStreams.length >= 3) {
        morgan
        return res.sendStatus(400);
    }
    
    // Add stream to user if they have less than 3
    await Users.addStreamToUserId(userID)

    // Code for sending video back would go here? Probably?

    // Once finished sending back video, remove from session
    // Oh wait how do I do this??

    res.sendStatus(200);
})

module.exports = router;
