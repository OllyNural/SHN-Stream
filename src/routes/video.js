const express = require('express');
const router = express.Router();

const { Users } = require('../models');

// For this I am making an assumption of passing an ID through a header 
// This would be handled with an API Gateway Authentication in my head
// Could go down the route of not using IDs, e.g IP-Based restrictions, but that feels grim
// This is the better approach I think IMHO
router.get('/', (req, res, next) => {
    const userID = req.header('X-User-Id');

    // Check number of sessions
    const currentUser = Users.getById(userID);
    console.log(currentUser);

    // If allowed, add one to session, and continue
    // If not, send back some error code

    // Code for sending video back would go here? Probably?

    // Once finished sending back video, remove from session

    res.sendStatus('200');
})

module.exports = router;
