const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { log } = require("console");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let request = httpRequest();

    request.then((array) => {
        console.log(array);
    })

    res.render("index");
})

async function httpRequest() {

    let array = [];

    for (let id = 1; id <= 20; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        let promise = new Promise((resolve, reject) => {

            https.get(url, res => {
                let result = '';

                res.on('data', data => {
                    result += data;
                });
                res.on('end', () => {
                    let pokemon = JSON.parse(result);
                    resolve(pokemon);
                });

            });
        })

        let pokemonData = await promise;
        console.log(pokemonData.forms[0].name);
        array.push(pokemonData);
    }
    return array;
}

app.listen(3000, function () {
    console.log("server started at port 3000");
})