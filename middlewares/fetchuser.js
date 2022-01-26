const jwt = require('jsonwebtoken');
require("dotenv").config();


// it contains 3 arguments, it modifies req and adds userID to id and then the next() function is passed which is in our case is (req,res) => {} in the route
const fetchuser = (req, res, next) => {
    // get the authToken from the header
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error: "Invalid auth-token"});
    }
    try {
        // fetching data/user from token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        // console.log(data.user.id);
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid auth-token" });
    }
}

module.exports = fetchuser;