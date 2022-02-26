const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Details = require('../models/Details');
const Contacts = require('../models/Contacts');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// for uploading status files
// FOR AZURE DATA UPLOAD
const multer = require('multer');
var MulterAzureStorage = require('multer-azure-storage');

var upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_CONNECTION_STRING,
        containerName: process.env.AZURE_CONTAINER,
        containerSecurity: 'blob',
        // fileName: req.user.username + "profilePic"
    })
});

// ROUTE 1: save the status on the cloud
router.post('/add', [upload.single("status"), fetchuser], async (req, res) => {
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        if (!req.file.url) {
            return res.status(500).json({ error: "Cloud Error. Try again later!" });
        }
        // get the existing status of the user
        let allStatus = await Details.findOne({ user: req.user.username }, { userStatus: 1, _id: 0 });
        // if a pre-existing details document is present for the user
        if (allStatus) {
            let newStatus;
            if (allStatus.userStatus) {
                allStatus = allStatus.userStatus;
                newStatus = [...allStatus, req.file.url];
            }
            else {
                newStatus = [req.file.url];
            }
            // updating the status array for the user account on the db
            let result = await Details.findOneAndUpdate({ user: req.user.username }, {
                $set: {
                    "userStatus": newStatus,
                }
            });
            return res.send("Success");
        }
        // if a all new entry is to be made to the database
        let result = await Details.create({
            user: req.user.username,
            userStatus: [req.file.url]
        });
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});

// ROUTE 2: send all the available status on the cloud
router.get('/all', async (req, res) => {
    try {
        let allStatus = await Details.find({}, { userStatus: 1, _id: 0, user: 1 });
        res.json(allStatus);
    } catch (error) {
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});


// ROUTE 3: delete a particular status of the user
router.delete('/delete', fetchuser, async (req, res) => {
    try {
        // verifying the user
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ error: "Invalid User!" });
        }

        // get the details from the database for the given user
        let details = await Details.findOne({ user: req.query.user });
        // verify if the details exists or not
        if (!details) {
            return res.status(404).json({ error: "No valid document found!" });
        }
        // make a new array of urls
        let urlsList = details.userStatus;
        urlsList.splice(req.query.index, 1);
        details = await Details.findOneAndUpdate({ user: req.query.user },
            {
                $set: {
                    "userStatus": urlsList
                }
            })
        res.json(urlsList);
    } catch (error) {
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});

module.exports = router;