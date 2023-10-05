require("dotenv").config();
const jwt = require('jsonwebtoken');

//used jwt token
//function to authenticate users who are logged in and trying to use user functionalities
const auth = (req, res, next) => {

    let token = req.headers.authorization;
    tokens = token.split(" ");

    if (!(tokens[1] == 'null')) {
        try {
            let user = jwt.verify(tokens[1], process.env.SECRET_KEY);
            req.username = user.name;
        }
        catch (err) {
            return res.redirect("http://localhost:3000/user/signin")
        }
        next();
    }
    else{
        return res.status(500).json({ message: "internal error", redirectTo:"http://localhost:3000/user/signin"})
    }
}

module.exports = auth;