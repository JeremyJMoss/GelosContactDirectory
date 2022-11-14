const {states, departments} = require("../constants/constants");

const isEmpty = (input) => {
    return input === "";
}

const isFullName = (input) => {
    const fullName = input.split(" ");
    return fullName.length === 2
}

const isNan = (input) => {
    const testNum = Number(input);
    return isNaN(testNum);
}

const isValidDepartment = (input) => {
    if (isNan(input)){
        return false;
    }
    return Number(input) <= departments.length - 1 && Number(input) >= 0 
}

const isValidPostCode = (input) => {
    return input.match(/^\d{4}$/);
}

const isValidState = (input) => {
    return states.includes(input);
}

const isFromAustralia = (input) => {
    return input === "Australia";
}

const  validateContact = (contact) => {
    for (const [key, value] of Object.entries(contact)) {
        if (isEmpty(value)){
            return `${key} cannot be empty`
        }
      }
    if (!isFullName(contact.name)){
        return "First name and Last Name must be included";
    }
    if (isNan(contact.phone)){
        return "Please enter valid phone number";
    }
    if (!isValidDepartment(contact.department)){
        return "Please enter a valid department";
    }
    if (!isValidState(contact.state)){
        return "Please enter a valid state";
    }
    if (!isValidPostCode(contact.postCode)){
        return "Please enter a valid post code";
    }
    if (!isFromAustralia(contact.country)){
        return "Contact Directory does not contain entries out of Australia";
    }
    return "OK"
}

module.exports = validateContact;