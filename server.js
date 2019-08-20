var express = require("express");
var path = require("path");

var app = express();
var PORT = 6464;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var patrons = [
    {
        routeName: "yoda",
        name: "Yoda",
        email: "Jedi Master",
        uniqueID: 900,
        phoneNumber: 2000
    },
    {
        routeName: "darthmaul",
        name: "Darth Maul",
        email: "Sith Lord",
        uniqueID: 200,
        phoneNumber: 1200
    },
    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        email: "Jedi Master",
        uniqueID: 55,
        phoneNumber: 1350
    }
 ];

 // Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "home.html"));
 });

 app.get("/waitlist", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "waitlist.html"));
 });

 app.get("/tables", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "tables.html"));
 });
 
 // Displays all characters
 app.get("/api/patrons", function (req, res) {
     console.log("test")
    return res.json(patrons);
 });
 // Displays a single character, or returns false
 app.get("/api/patrons/:patron", function (req, res) {
    var chosen = req.params.patron;
    console.log(chosen);
    for (var i = 0; i < patrons.length; i++) {
        if (chosen === patrons[i].routeName) {
            return res.json(patrons[i]);
        }
    }
    return res.json(false);
 });
 // Create New Characters - takes in JSON input
app.post("/api/tables/patrons", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newPatron = req.body;
  
    console.log(newPatron);
  
    patrons.push(newPatron);
  
    res.json(newPatron);
  });
 
 app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });