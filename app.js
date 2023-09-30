const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/", function(req, res) {
    res.render("hi");
})

app.listen(3000, function() {
    console.log("server started at port 3000");
})