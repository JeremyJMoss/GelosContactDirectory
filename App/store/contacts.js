import { createSlice } from "@reduxjs/toolkit";

const contactInitialState = {
    contacts: [],
}

const contactSlice = createSlice({
    name: "contacts",
    initialState: contactInitialState,
    reducers: {
        setContacts(state, action){
            state.contacts = action.payload
        }
    }
})

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;