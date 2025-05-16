import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../utils";

export const activitiesReducer = createSlice({
    name: "workout",
    initialState: {
        activities: null,
        currentSubActivities: null,
    },
    reducers: {
        addWorkout: (state, action) => {
            if (!state.activities) {
                state.activities = [];
            }
            state.activities.push(action.payload.activities);
        },
        setActivities: (state, action) => {
            state.activities = action.payload;
            if (!action.payload) {
                state.activities = null;
            }
        },
        addActivity: (state, action) => {
            if (!state.activities) {
                state.activities = [];
            }
            state.activities.push(action.payload.activities);
        },
        setCurrentSubActivities: (state, action) => {
            state.currentSubActivities = action.payload.subActivities;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addWorkout,
    setActivities,
    addActivity,
    setCurrentSubActivities,
} = activitiesReducer.actions;

export default activitiesReducer.reducer;
