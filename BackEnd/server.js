const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const server = express();
const Contact = require("./classes/Contact")


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.get("/contacts", (req, res) => {
    fs.readFile(path.join("dummyData", "data.csv"), "utf8", (err, data) => {
    if(err){
        console.log(err.message);
        return;
    }
    
    const currentContacts = data.split("\n").map(contact => {
        const savedContact = new Contact(...contact.split(","));
        return savedContact; 
    });

    res.json(currentContacts);
  })  
  
})

server.post("/contacts", (req, res) => {
    res.send("hello");
})

server.listen(5000, () => {
    console.log("server listening on http://localhost:5000");
})