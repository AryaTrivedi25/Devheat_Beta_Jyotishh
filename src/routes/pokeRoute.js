const express = require('express');
const {generate,search, details} = require("../controllers/pokeController")
const pokeRouter = express.Router();



//get request to get 30 random pokemon from the api
pokeRouter.get("/",generate)

//post request to to display result of a search
pokeRouter.post("/search",search)

//get request for specific pokemon page
pokeRouter.get("/pokemon/:pair",details)

module.exports = pokeRouter;