class Contact{
    constructor(id, name, phoneNumber, department, street, city, state, postCode, country){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postCode = postCode;
        this.country = country;
    }

    toString() {
        const joiningArray = [this.id, this.name, this.phoneNumber, this.department, this.street, this.suburb, this.state, this.postCode, this.country];
        return joiningArray.join(","); 
    }
}

module.exports = Contact;