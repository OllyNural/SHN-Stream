const express = require('express');
const router = express.Router();

const MAX_STREAMS = 3;

const { Users } = require('../models');

// For this I am making an assumption of passing an ID through a header 
// This would be handled with an API Gateway Authentication in my head
// Could go down the route of not using IDs, e.g IP-Based restrictions, but that feels grim
// This is the better approach I think IMHO
router.get('/', async (req, res, next) => {
    const userID = req.header('X-User-Id');

    if (!userID) res.sendStatus(401)

    // Check number of sessions
    const currentUserStreams = await Users.getStreamsByIdJson(userID);
    if (currentUserStreams.length >= 3) {
        return res.sendStatus(400);
    }
    await Users.addStreamToUserId(userID)


    // If allowed, add one to session, and continue
    // If not, send back some error code

    // Code for sending video back would go here? Probably?

    // Once finished sending back video, remove from session

    res.sendStatus(200);
})

module.exports = router;
