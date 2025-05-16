import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        id: null,
        login: null,
        email: null,
        state: false,
        weight: null,
        height: null,
        role: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id ? action.payload.id : state.id;
            state.login = action.payload.login
                ? action.payload.login
                : state.login;
            state.email = action.payload.email
                ? action.payload.email
                : state.email;
            state.state = true;
            state.height = action.payload.height
                ? action.payload.height
                : state.height;
            state.weight = action.payload.weight
                ? action.payload.weight
                : state.weight;
            state.role = action.payload.role ? action.payload.role : state.role;
        },
        setLogout: (state) => {
            state.id = null;
            state.login = null;
            state.email = null;
            state.state = false;
            state.token = null;
            state.photo = null;
            state.role = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogout } = userReducer.actions;

export default userReducer.reducer;
