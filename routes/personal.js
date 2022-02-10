const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Details = require('../models/Details');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// save/update a bio of the user
router.post('/bio', fetchuser, async (req, res) => {
    try {
        let user = req.user.username;
        // verifying user in the database
        let userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        // check if pre-exisiting detials are present for the user
        let updatedData = await Details.findOne({ user });
        if (updatedData) {
            Details.findOneAndUpdate({ user }, {
                $set: { "bio": req.body.bio }
            }, async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: "DB error Occured!" });
                }
                updatedData = await Details.findById(results._id);
                return res.json({ details: updatedData });
            });
        }
        else {
            // no pre-exisiting details are present of the user
            updatedData = await Details.create({
                user,
                bio: req.body.bio
            });
            res.json({ details: updatedData });
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});

// get all the details of the user
router.get('/details', fetchuser, async (req, res) => {
    let user = req.user.username;
    let userId = req.user.id;
    // check if user exists
    let userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(401).json({ error: "Invalid Credentials" });
    }
    // get the details of the user saved on the db 
    let details = await Details.findOne({ user });
    if (!details) {
        return res.status(404).json({ error: "No details Found" });
    }
    res.json({ details });
});

// save/update profile pricture of a user
router.post('/profile_pic', (req, res) => {
    // TODO: Complete the Route
});

// save new status of the user
router.post('/save_status', (req, res) => {
    // TODO: Complete the Route
});

// Delete status of the user
router.delete('/delete_status', (req, res) => {
    // TODO: Complete the Route
});

module.exports = router;