const express = require('express');
const {signup, signin, addFavourite, profile,profilePage} = require("../controllers/userController")
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

//post request to handle signin signup 
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

//route to preprocess the profile page data with authentication middleware
userRouter.get("/profile",auth,profile)

//route to get to the profile page
userRouter.post("/profilePage",profilePage)

//post request to add a particular poekemon into favorites
userRouter.get("/:pair/favourite",auth,addFavourite);


module.exports = userRouter;