export const formInitialState = {
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

export const formReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            const field = action.payload.name;
            const fieldObject = state[field]
            return {
                ...state,
                [field]: {
                    ...fieldObject,
                    value: action.payload.value
                }
            }
        case "RESET_FORM":
            return formInitialState;
        default:
            return state;
    }
}