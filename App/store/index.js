import { configureStore } from "@reduxjs/toolkit";

import contactReducer from "./contacts";

const store = configureStore({
    reducer: {
        contacts: contactReducer
    }
})

export default store;