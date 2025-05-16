import { createSlice } from '@reduxjs/toolkit'

export const notfReducer = createSlice({
    name: 'notification',
    initialState: {
        expoPushToken: null,
        notification: {}
    },
    reducers: {
        setExpoToken : (state,action)=>{
            state.expoPushToken = action.payload
        },
        setNotif : (state,action) => {
            state.notification = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setExpoToken,setNotif } = notfReducer.actions

export default notfReducer.reducer