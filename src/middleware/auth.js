const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    try {

        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.SECRET_KEY)
            req.username = user.name;
        }
        else {
            res.send("unauthorised").status(401).json({ message: "unauthorised user" });
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"internal error"})
    }
}

module.exports = auth;