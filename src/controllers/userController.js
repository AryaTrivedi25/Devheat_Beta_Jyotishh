const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { log } = require('console');

//creatisonnebgoken and connecting to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9979',
    database: 'pokemonrottom'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})


//asyncronous fuction for signup
const signup = async (req, res) => {

    const { username, email, password } = req.body;

    //checking if a user already exists or not
    const existingUser = await query(email);
    if (existingUser.length != 0) {
        return res.status(400).json({ message: "user already exists", alert:"1"})
    }

    //creating hashed password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //inserting username, email, hashedPassword
    let insertQuery = `INSERT INTO user VALUES ("${email}","${username}","${hashedPassword}");`;
    connection.execute(insertQuery, (err, result, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
    });

    //creating a table for our newly registered user to store their fav pokemon
    let tableQuery = `CREATE TABLE ${username}_pokemon (pokemon_id VARCHAR(50) NOT NULL, pokemon_name VARCHAR (50) NOT NULL);`

    connection.execute(tableQuery, (err, result, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
    });

    res.status(200).json({ message: "user created successfully", redirectTo:"http://localhost:3000/"})
}

//fuction to query to database using email for retriving user with particular email
function query(email) {
    return new Promise((resolve, reject) => {
        let query = `SELECT u_email FROM user WHERE u_email LIKE "${email}";`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })
}

//function to process signin request
const signin = async (req, res) => {

    const { username, password } = req.body;

    //querying the database for retriving user data
    let promise = new Promise((resolve, reject) => {
        let query = `SELECT pass FROM user WHERE u_name LIKE "${username}"`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })

    let hashPassword = await promise;
    if (hashPassword.length == 0) {
        return res.sendFile(path.join(__dirname, "../../public/html/login.html"));
    }

    //matching the password
    const matchPassword = await bcrypt.compare(password, hashPassword[0].pass);

    //if it dosen't matches it's redirected to login
    if (!matchPassword) {
        return res.sendFile(path.join(__dirname, "../../public/html/login.html"));
    }

    //once logged in user is given jwt login token
    const token = jwt.sign({ name: username }, process.env.SECRET_KEY);

    res.status(200).json({ token: token, redirectTo: "http://localhost:3000/", status:"1" });
}

const addFavourite = async (req, res) => {

    let param = req.params.pair.split("-");

    let id = parseInt(param[0]);
    let pokename = param[1];

    let username = req.username;

    let insertQuery = `INSERT INTO ${username}_pokemon VALUES (${id}, "${pokename}");`;
    connection.execute(insertQuery, (err, result, fields) => {
        if (err) {
            res.status(401).json({msg: 'dup'})
        }
    })
    res.status(200).json({msg: 'done', status:"1"})
}

const profile = async (req, res) => {
    let username = req.username;
    if(username){
        let query = `SELECT * FROM ${username}_pokemon;`;
        return res.json({profile:1, username: username});
    }
    else{
        return res.json({redirectTo:"http://localhost:3000/user/signin"});
    }
}

const profilePage = (req,res)=>{
    const username = req.body.username;
    console.log(username);
    let query = `SELECT * FROM ${username}_pokemon;`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
            }
            return res.render("profile", {username:username, data:result})
        })
}


module.exports = { signup, signin, addFavourite, profile, profilePage };