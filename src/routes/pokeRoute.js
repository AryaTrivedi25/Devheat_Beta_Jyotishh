const express = require('express');
const {generate,search} = require("../controllers/pokeController")
const pokeRouter = express.Router();



//get request to get 30 random pokemon from the api
pokeRouter.get("/generate",generate)

pokeRouter.post("/search",search)

module.exports = pokeRouter;