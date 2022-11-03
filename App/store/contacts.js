import { createSlice } from "@reduxjs/toolkit";

const contactInitialState = {
    contacts: [],
    isLoading: false,
}

const contactSlice = createSlice({
    name: "contacts",
    initialState: contactInitialState,
    reducers: {
        loading(state){
            state.isLoading = true;        
        },
        notLoading(state){
            state.isLoading = false;
        },
        setContacts(state, action){
            state.contacts = action.payload
        }
    }
})

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;