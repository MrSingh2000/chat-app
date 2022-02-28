const express = require('express');
const router = express.Router();
require("dotenv").config();
const fetchuser = require('../middlewares/fetchuser');
const Details = require('../models/Details');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

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
})

// We can also use these base libs to do the same we are doing with MulterAzureStorage
const AzureStorageBlob = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
const container = process.env.AZURE_CONTAINER

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
router.post('/profile_pic', [upload.single("profilePic"), fetchuser], async (req, res) => {
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        // get the uploaded file url from the request (with the help of middleware)
        let url = req.file.url;
        // updating the profile url of that particular user
        if (url) {
            let query = await Details.findOne({ user: req.user.username });
            if (query) {
                query = Details.findOneAndUpdate({ user: req.user.username },
                    {
                        $set: {
                            "pic": url
                        }
                    });
                // used this syntax because "query already executed" error occurs, this resolves it
                await query.clone();
            }
            else {
                query = await Details.create({
                    user: req.user.username,
                    pic: url
                });
            }
            let details = await Details.findOne({ user: req.user.username });
            return res.json({ details });
        }
        res.status(500).json({ error: "Failed to upload file, Try again!" });

    } catch (error) {
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});


// get only profile pic of an user
router.get('/c_profile', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({ error: "Invalid Credentials" });
        }
        let contact = req.query.client;
        let contactDetails = await Details.findOne({ user: contact });
        if (!contactDetails) {
            return res.json({ pic: "" });
        }
        res.json({ pic: contactDetails.pic });
    } catch (error) {
        res.status(500).json({ error: "Server Error Occurred! Try Again Later." });
    }
});

module.exports = router;