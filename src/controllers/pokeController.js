const https = require('https');

const generate = async (req, res) => {

    let array = [];
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=30`;
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
    
    res.render('index', {data:pokemonData})
}

const search = async (req, res) => {

    let name = req.body.name;
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
    console.log(pokemonData.forms[0].name);
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
    res.render("pokemon",{data:pokemonData});
}

module.exports = {generate, search, details};