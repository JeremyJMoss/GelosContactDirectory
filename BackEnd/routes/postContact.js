const express = require("express");
const fs = require("fs");
const path = require("path");
const Contact = require("../classes/Contact");
const router = express.Router();
const validateContact = require("../logic/contactValidationLogic");
const pathToContactData = path.join("dummyData", "data.csv")

const retrieveCurrentContacts = (contactInfo) => {
    if (!contactInfo){
        return [];
    }
    return contactInfo.split("\n").map(contact => {
        const savedContact = new Contact(...contact.split(","));
        return savedContact;
    })
}

router.post("/", (req, res) => {
    fs.readFile(pathToContactData, "utf8", (err, data) => {
        if(err){
            return res.status(500).json({message:"Internal Server Error: Could not find contacts"});
        }

        const {fullName, phone, department, street, suburb, state, postCode, country} = req.body;

        const currentContacts = retrieveCurrentContacts(data);
        
        const nextContactId = Number(currentContacts[currentContacts.length - 1].id) + 1;
        const newContact = new Contact(
            nextContactId, 
            fullName, 
            phone, 
            department, 
            street, 
            suburb, 
            state,
            postCode,
            country
            );

        const message = validateContact(newContact);

        if (message !== "OK"){
            return res.status(400).json({message})            
        }
        fs.appendFile(pathToContactData, `\n${newContact.toString()}`, err => {
            if(err){
                return res.status(500).json({message:"Internal Server Error: Could not find contacts"});
            }
        })
        return res.status(200).json(newContact);
        

    })
    
})

router.delete("/", (req, res) => {
    fs.readFile(pathToContactData, "utf8", (err, data) => {
        if(err){
            return res.status(500).json({message:"Internal Server Error: Could not find contacts"});
        }

        const id = req.query.id;

        const currentContacts = retrieveCurrentContacts(data);

        const deletedContact = currentContacts.find(contact => contact.id === id);

        const newContactArray = currentContacts.filter(contact => contact.id !== id);
        
        const stringifiedArray = newContactArray.map(contact => {
            return contact.toString();
        })
        
        const fileFormatString = stringifiedArray.join("\n");

        fs.writeFile(pathToContactData, fileFormatString, (err) => {
            if(err){
                return res.status(500).json({message: "Internal Server Error: Could not write to contact file"})
            }
            res.status(200).json(deletedContact);
        })

        
        
    })
})

router.get("/", (_, res) => {
    fs.readFile(pathToContactData, "utf8", (err, data) => {
    if(err){
        return res.status(500).json({message:"Internal Server Error: Could not find contacts"});
    }
    
    const currentContacts = retrieveCurrentContacts(data);

    if (currentContacts.length < 1){
        return res.status(200).json([]);
    }

    res.status(200).json(currentContacts);
    
  })  
  
})

router.put("/", (req, res) => {
    const id = req.query.id;
    fs.readFile(pathToContactData, "utf8", (err, data) => {
        if (err){
            return res.status(500).send({message: "Internal Server Error: Could not find contacts"})
        }
        const {fullName, phone, department, street, suburb, state, postCode, country} = req.body;

        const currentContacts = retrieveCurrentContacts(data);

        const contactToUpdate = currentContacts.find(contact => contact.id === id);

        if(!contactToUpdate){
            return res.status(400).json({message: "This contact does not exist"});
        }
        const updatedContact = new Contact(
            id, 
            fullName, 
            phone, 
            department, 
            street, 
            suburb, 
            state,
            postCode,
            country
        );

        const message = validateContact(updatedContact);

        if (message !== "OK"){
            return res.status(400).json({message})
        }

        

        const filteredContacts = currentContacts.filter(contact => contact.id !== id);

        filteredContacts.push(updatedContact);

        const stringifiedArray = filteredContacts.map(contact => {
            return contact.toString();
        })
        
        const fileFormatString = stringifiedArray.join("\n");

        fs.writeFile(pathToContactData, fileFormatString, (err) => {
            if(err){
                return res.status(500).json({message: "Internal Server Error: Could not write to contact file"})
            }
            res.status(200).json(updatedContact);
        })

        
    })
    
})

module.exports = router;