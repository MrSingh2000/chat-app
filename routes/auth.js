const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Details = require('../models/Details');
require("dotenv").config();

// ROUTE 1: login route
router.post('/login', async (req, res) => {
    // validation request, (implementation is quite different from other projects as it is updated version)
    await check('username', "Username should be  more than 3 chars").isLength({ min: 3 }).run(req);
    await check('password', "Password should be more than 3 chars").isLength({ min: 3 }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let { username, password } = req.body;
        let user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: "User not Found!"});
        }
        let passCompare = bcrypt.compare(password, user.password);
        if(!passCompare){
            return res.status(401).json({error: "Invalid Credentials"});
        }
        const data = {
            user: {
                id: user.id,
                username: user.username,
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred!" });
    }
});

// ROUTE 2: signup route
router.post('/signup', async (req, res) => {
    // validation request, (implementation is quite different from other projects as it is updated version)
    await check('username', "Username should be  more than 3 chars").isLength({ min: 3 }).run(req);
    await check('password', "Password should be more than 3 chars").isLength({ min: 3 }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        let { username, password } = req.body;
        let user = await User.findOne({username});
        if(user){
            return res.status(404).json({error: "Username not available"});
        }
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(password, salt);
        user = await User.create({
            username, password: securepass
        })
        const data = {
            user: {
                id: user.id,
                username: user.username,
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // creating a empty details document for easiness in upcoming code (and also reduce some errors)
        res.json({authToken});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error Occurred!" });
    }
});


module.exports = router;