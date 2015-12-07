/* Modules */
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

/* Configuration */
var db = require("./config/db");
var port = process.env.PORT || 8080;

/*  Connet to database */ 
mongoose.connect(db.url);

/* Get the data from the body (POST) and parse it*/
app.use(bodyParser.json());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
//app.use(bodyParser.urlencoded({extended: true}));

/* Override with the X-HTTP-Method-Override header
    in the request. This simulates DELETE/PUT*/
app.use(methodOverride("X-HTTP-Method-Override"));

/* Set static file location for users */
app.use(express.static(__dirname+"/public"));

/* Setting up routes */
require("./app/routes")(app);

/* Start the app */
app.listen(port);
console.log("Server is running on port " + port);

exports = module.exports = app;