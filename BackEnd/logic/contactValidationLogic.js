const STATES = require("../constants/constants");

const isEmpty = (input) => {
    return input === "";
}

const isNan = (input) => {
    const testNum = Number(input);
    return isNaN(testNum);
}

const isValidPostCode = (input) => {
    return input.match(/^\d(4)$/) && input.length === 4
}

const isValidState = (input) => {
    return STATES.includes(input.toUpperCase());
}

export const  validateCustomer = (contact) => {

}