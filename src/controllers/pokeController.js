const https = require('https');


const generate = async (req, res) => {

//this function generates 30 random pokemons

    let array = [];
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100`;
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
    
    res.render('index', {search:0, data:pokemonData})
}

const search = async (req, res) => {

    let name = req.body.pokemon;

    console.log(name);
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
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
    res.render("index", {search:1, data:pokemonData})
}

const details = async (req,res)=>{
    let name = req.params.name;
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
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
    res.send("<h1>" + pokemonData.forms[0].name + "</h1>")
    res.render("pokemon",{data:pokemonData});
}

module.exports = {generate, search, details};