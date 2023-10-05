const https = require('https');


const generate = async (req, res) => {
//this function generates 30 random pokemons

    let array = [];
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=200`;
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

//this fuction gives search functionality to the site
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
                resolve(result);
            });
        });
    })
    let pokemonData = await promise;

    // console.log(JSON.parse(pokemonData));

    res.render("index", {search:1, data:JSON.parse(pokemonData)})
}

//this gives data of a particular pokemon to the details page
const details = async (req,res)=>{
    let name = req.params.pair.split("-");

    let url = `https://pokeapi.co/api/v2/pokemon/${name[1]}`;
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
    res.render("pokemon",{data:pokemonData, id:name[0]});
}

module.exports = {generate, search, details};