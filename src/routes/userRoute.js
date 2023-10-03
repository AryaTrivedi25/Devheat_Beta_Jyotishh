const express = require('express');
const {signup, signin, addFavourite} = require("../controllers/userController")
const userRouter = express.Router();

//get requests to serve signup and login page
userRouter.get("/signup", (req,res)=>{
    res.sendFile(__dirname+"../../public/signup.html")
});

userRouter.get("/signin", (req,res)=>{
    res.sendFile(__dirname+"../../public/login.html")
});

//post request to handle signin signup and authetication using tokens
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

//post request to add a particular poekemon into favorites
userRouter.post("/:id/favourite", addFavourite);

module.exports = userRouter;