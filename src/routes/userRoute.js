const express = require('express');
const {signup, signin, addFavourite, profilePage} = require("../controllers/userController")
const auth = require("../middleware/auth");
const { log } = require('console');
const userRouter = express.Router();
const path = require("path");

//get requests to serve signup and login page
userRouter.get("/signup", (req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/html/signup.html"))
});

userRouter.get("/signin", (req,res)=>{
    res.sendFile(path.join(__dirname,"../../public/html/login.html"))
});

//post request to handle signin signup and authetication using tokens
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.get("/profile",auth,profilePage)

//post request to add a particular poekemon into favorites
userRouter.get("/:pair/favourite",auth,addFavourite);


module.exports = userRouter;