const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Contacts = require('../models/Contacts');
const Details = require('../models/Details');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');


// get a client is valid or not (clientID)
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

// add a new contact in db of a particular user
router.post('/add_contact', fetchuser, async (req, res) => {
    // validation request, (implementation is quite different from other projects as it is updated version)
    await check('clientId', "Username should be  more than 3 chars").exists().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        // extracting username from the request body
        let user = req.user.username;
        // verify if user exists
        let userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(401).json({ errror: "Invalid Credentials" });
        }
        let profilePic = await Details.findOne({ user: req.body.clientId }, { _id: 0, pic: 1 });
        console.log("ProfilePic: ", profilePic);
        if (profilePic === null) {
            profilePic = "nopic";
        }
        else if (profilePic.pic === null) {
            profilePic = "nopic";
        }
        else if (profilePic.pic === "") {
            profilePic = "nopic";
        }
        else {
            profilePic = profilePic.pic;
        }

        // create new contact object
        let newClient = {
            data: req.body.clientId,
            lastChat: "",
            pic: profilePic
        };
        // get the existing contact details for the user
        let contact = await Contacts.findOne({ user });
        // verify if previously contact details exists, if yes just update the contacts array
        if (contact) {
            // check if contact is already added
            if (contact.contacts) {
                let clientId = req.body.clientId;
                for (let i = 0; i < contact.contacts.length; i++) {
                    if (contact.contacts[i].data === clientId) {
                        return res.status(401).json({ error: "Contact Already Exits!" });
                    }
                }
            }
            let updateContact = await Contacts.findOneAndUpdate({ user },
                {
                    $set: { "contacts": [...contact.contacts, newClient] }
                });
            if (!updateContact) {
                return res.json({ error: "Failed to Add new contact" });
            }
            // get the updated list of contacts
            contact = await Contacts.findOne({ user });
            return res.json({ contact });
        }
        // if no previous record of contacts is found create new record
        else {
            contact = await Contacts.create({
                user,
                contacts: [{
                    data: req.body.clientId,
                    lastChat: "",
                    pic: profilePic
                }]
            });
            return res.json({ contact });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Server Errror Occurred! Try again Later." });
    }
});

// delete a contact from the contact List
router.post('/delete_contact', fetchuser, async (req, res) => {
    // validation request, (implementation is quite different from other projects as it is updated version)
    await check('clientId', "Username should be  more than 3 chars").exists().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        // extracting username from the request body
        let user = req.user.username;
        // verify if user exists
        let userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(401).json({ errror: "Invalid Credentials" });
        }
        // extract clientId from the request body
        let clientId = req.body.clientId;
        // get the contacts of the user
        let contact = await Contacts.findOne({ user });
        // make an array of new contacts (removing the required particular contact)
        let newContacts = contact.contacts.filter((item) => (item.data !== clientId));
        // updating the contact list
        contact = await Contacts.findOneAndUpdate({ user }, {
            $set: { "contacts": newContacts }
        })
        // send the updated contact list
        res.json(newContacts);
    } catch (error) {
        res.status(500).json({ error: "Server Errror Occurred! Try again Later." });
    }
});

// send the existing contact list of the user (used when user logins)
router.get('/my_contacts', fetchuser, async (req, res) => {
    try {
        // get user from the reques (via headers by fetchuser middleware)
        let user = req.user.username;
        let userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        // get existing contact list for the user
        let contact = await Contacts.findOne({ user });
        res.json({ contact });
    } catch (error) {
        res.status(500).json({ error: "Server Errror Occurred! Try again Later." });
    }
});

module.exports = router;