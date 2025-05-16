import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import activitiesReducer from "./activitiesReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    workout:activitiesReducer,
    notification:notificationReducer,
  });
export default rootReducer;