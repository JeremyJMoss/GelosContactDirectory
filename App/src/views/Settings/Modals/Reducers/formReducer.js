export const formInitialState = (prefillContact) => {
    if (!prefillContact){
        return {
            firstName: {
                value: "",
                hasError: true
            },
            lastName: {
                value: "",
                hasError: true
            },
            phone: {
                value: "",
                hasError: true
            },
            street: {
                value: "",
                hasError: true
            },
            suburb: {
                value: "",
                hasError: true
            },
            state: {
                value: "",
                hasError: true
            },
            postCode: {
                value: "",
                hasError: true
            },
            country: {
                value: "",
                hasError: true
            },
            department: {
                value: "",
                hasError: true
            }
        }
    }
    return {
            firstName: {
                value: prefillContact.firstName,
                hasError: false
            },
            lastName: {
                value: prefillContact.lastName,
                hasError: false
            },
            phone: {
                value: prefillContact.phone,
                hasError: false
            },
            street: {
                value: prefillContact.street,
                hasError: false
            },
            suburb: {
                value: prefillContact.suburb,
                hasError: false
            },
            state: {
                value: prefillContact.state,
                hasError: false
            },
            postCode: {
                value: prefillContact.postCode,
                hasError: false
            },
            country: {
                value: prefillContact.country,
                hasError: false
            },
            department: {
                value: prefillContact.department,
                hasError: false
            }
        }
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            const field = action.payload.name;
            const fieldObject = state[field]
            return {
                ...state,
                [field]: {
                    ...fieldObject,
                    value: action.payload.value,
                    hasError: action.payload.value === ""
                }
            }
        case "RESET_FORM":
            return formInitialState();
        default:
            return state;
    }
}