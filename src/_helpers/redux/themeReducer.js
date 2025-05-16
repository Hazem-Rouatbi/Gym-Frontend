import { createSlice } from '@reduxjs/toolkit'

export const themeReducer = createSlice({
  name: 'appTheme',
  initialState: {
    value: 'light'
  },
  reducers: {
    setColor: (state, action) => {
      state.value = action.payload.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { setColor } = themeReducer.actions

export default themeReducer.reducer