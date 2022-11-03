import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import contactReducer from "./contacts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactReducer
    }
})

export default store;