const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('console');

const SECRET_KEY = "dvsvffsdvfgrdsavbrgfsvf";

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
    const existingUser = await query(email);

    console.log(existingUser);

    if (existingUser.length != 0) {
        return res.status(400).json({ message: "user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let Pid = [];
    let text = Pid.toString();
    //inserting username, email, hashedPassword

    let insertQuery = `INSERT INTO user VALUES ("${email}","${username}","${hashedPassword}","${text}");`;
    connection.execute(insertQuery, (err, result, fields) => {
        console.error('error connecting: ' + err.stack);
        return;
    });

    res.status(200).json({ message: "user created successfully" })
}

//fuction to query to database using email for retriving user with particular email
function query(email) {
    let promise = new Promise((resolve, reject) => {

        let query = `SELECT u_email FROM user WHERE u_email LIKE "${email}";`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })
    return promise;
}


//function to process signin request
const signin = async (req, res) => {

    const { username, password } = req.body;

    let promise = new Promise((resolve, reject) => {

        let query = `SELECT pass FROM user WHERE u_name LIKE "${username}";`;
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
        return res.status(404).json({ message: "user dosen't exist" });
    }

    const matchPassword = await bcrypt.compare(password, hashPassword[0].pass);

    if (!matchPassword) {
        return res.status(403).json({ message: "incorrect password" });
    }

    const token = jwt.sign({ name: username }, process.env.SECRET_KEY);
    return res.status(200).json({ token: token });

}


const addFavourite = async (req, res) => {

    let id = req.params.id;

    let username = req.username;

    let promise = new Promise((resolve, reject) => {

        let query = `SELECT p_id FROM user WHERE u_name LIKE "${username}";`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })

    let fString = await promise;

    let favourites = [];

    if (fString[0].length > 0) {
        favourites = fString[0].split(',');
        console.log(favourites);
        res.status(200).json({ msg: favourites })
    }

    favourites.push(id);

    let returnString = favourites.join();

    //store return string in the p_id of username.

    res.status(200).json({ msg: returnString })
}


const profilePage = async (req, res) => {

    let username = req.username;

    let promise = new Promise((resolve, reject) => {

        let query = `SELECT p_id FROM user WHERE u_name LIKE "${username}";`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })

    let favouriteString = await promise;

    let favourites = favouriteString[0].split(',');



}


module.exports = { signup, signin, addFavourite, profilePage };