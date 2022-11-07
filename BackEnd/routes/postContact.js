const express = require("express");
const fs = require("fs");
const path = require("path");
const Contact = require("../classes/Contact");
const router = express.Router();
const validateContact = require("../logic/contactValidationLogic");

router.post("/", (req, res) => {
    fs.readFile(path.join("dummyData", "data.csv"), "utf8", (err, data) => {
        if(err){
            console.log(err.message);
            return;
        }

        const contactDetails = req.body;
        const currentContacts = data.split("\n").map(contact => {
            const savedContact = new Contact(...contact.split(","));
            return savedContact;
        })
        
        const nextContactId = Number(currentContacts[currentContacts.length - 1].id) + 1;
        const newContact = new Contact(
            nextContactId, 
            contactDetails.fullName, 
            contactDetails.phone, 
            contactDetails.department, 
            contactDetails.street, 
            contactDetails.suburb, 
            contactDetails.state,
            contactDetails.postCode,
            contactDetails.country
            );
        
        const message = validateContact(newContact);
        
        console.log(message);

        if (message === "All Values OK"){
            return res.status(200).json(newContact);
        }
        
        return res.status(400).json({message})

    })
    
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