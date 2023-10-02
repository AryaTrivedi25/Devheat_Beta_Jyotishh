const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//creatisonnebgoken and connecting to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9979',
    database: 'Login_page'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})


//asyncronous fuction for signup
const signup = async (req,res) => {

    //existing user check ..
    //hashed password
    //user creation
    //token generation

    const {username , email, password} = req.body;

    const existingUser = await query(email);

    if (JSON.stringify(existingUser) != '{}') {
        return req.status(400).json({message:"user already exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    connection.execute(insertQuery, (err,result,fields)=>{
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    })

    const token = await jwt.sign({usrname:username, email: email},SECRET_KEY);
}


//fuction to query to database using email for retriving user with particular email
function query(email){
    let query;
    connection.execute(query, (err,result,fields)=>{
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        return result;
    })
}



//function to process signin request
const signin = (res,req) => {
    console.log(signin);
}

module.exports = {signup, signin};