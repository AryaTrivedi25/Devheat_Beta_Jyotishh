const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    let param = req.params.pair.split("-");

    let id = param[0];
    let pokename = param[1];

    let username = req.username;

    const arr = await p_idQuery(username);

    let JSONData = JSON.parse(arr[0].p_id);
    
    let check = id in JSONData;
    
    if(!check){
        JSONData[pokename] = id;
    }
    else{
        res.status(401).json({msg:"user already exists"});
    }
    
    let insertStr = JSON.stringify(JSONData);
    console.log("2" + insertStr);

    try {
        let insertQuery = `UPDATE user SET p_id = '${insertStr}' WHERE u_name LIKE '${username}';`;
        connection.execute(insertQuery, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }

    res.status(200).json({ msg: 'done' })

}


function p_idQuery(username) {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT p_id FROM user WHERE u_name LIKE "${username}";`;
        connection.execute(query, (err, result, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject("err");
            }
            resolve(result);
        })
    })
}


const profilePage = async (req, res) => {

    let username = req.username;

    const arr = await p_idQuery(username);

    let JSONData = JSON.parse(arr[0].p_id);

    let keys = Object.keys(JSONData);

    const result = [];

    console.log(JSONData);

    keys.forEach(key => {
        console.log(key);

        result.push({key:JSONData.key})
    });

    console.log(result);

    res.render("profile", { username: username, data:result})
}


module.exports = { signup, signin, addFavourite, profilePage };