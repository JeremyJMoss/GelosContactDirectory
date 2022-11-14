class Contact{
    constructor(id, name, phone, department, street, suburb, state, postCode, country){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.department = department;
        this.street = street;
        this.suburb = suburb;
        this.state = state;
        this.postCode = postCode;
        this.country = country;
    }

    toString() {
        const joiningArray = [this.id, this.name, this.phone, this.department, this.street, this.suburb, this.state, this.postCode, this.country];
        return joiningArray.join(","); 
    }
}

module.exports = Contact;