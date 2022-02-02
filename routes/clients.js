const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        let userId = req.query.userid;
        let userIdDb = await User.find({ username: userId });
        if (userIdDb.length === 0) {
            return res.status(404).json({ error: "Invalid Username" });
        }
        res.json({ success: true, userId });
    } catch (error) {
        res.status(500).json({ error: "Server Errror Occurred! Try again Later." });
    }
});

module.exports = router;