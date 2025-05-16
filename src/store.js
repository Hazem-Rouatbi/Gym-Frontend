
import {  configureStore } from '@reduxjs/toolkit'
import rootReducer from './_helpers/redux/reducers';


const store = configureStore({
    reducer: rootReducer
})
export default store;