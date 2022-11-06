const express = require("express");
const fs = require("fs");
const path = require("path");
const Contact = require("../classes/Contact");
const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    fs.readFile(path.join("dummyData", "data.csv"), "utf8", (err, data) => {
        if(err){
            console.log(err.message);
            return;
        }

        const currentContacts = data.split("\n").map(contact => {
            const savedContact = new Contact(...contact.split(","));
            return savedContact;
        })

        const nextContactId = Number(currentContacts[currentContacts.length - 1].id) + 1;
        
    })

    res.status(200).json("hello");
})

router.get("/", (_, res) => {
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

module.exports = router;