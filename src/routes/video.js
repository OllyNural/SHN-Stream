const express = require('express');
const router = express.Router();

const MAX_STREAMS = 3;

const { Users } = require('../models');

// See README for logging
router.get('/', async (req, res, next) => {
    const userID = req.header('x-user-id');
    if (!userID) {
        return res.sendStatus(401)
    }

    let currentUserStreams

    try {
        currentUserStreams = await Users.getStreamsByIdJson(userID);
    } catch (e) {
        // logger.error({timestamp, id: userID, streams: currentUserStreams});
    }
    if (currentUserStreams.length >= MAX_STREAMS) {
        // logger.info({id: userID, streams: currentUserStreams});
        return res.sendStatus(400);
    }
    try {
        await Users.addStreamToUserId(userID)
    } catch (e) {
        // logger.error({timestamp, id: userID, streams: currentUserStreams});
    }

    // Code for sending video back would go here?
    // Not actually sure how this would work with express res.send() or similar?

    try {
        await Users.removeStreamFromUserId(userID)
    } catch (e) {
        // logger.error({timestamp, id: userID, streams: currentUserStreams});
    }

    res.sendStatus(200);
})

module.exports = router;
