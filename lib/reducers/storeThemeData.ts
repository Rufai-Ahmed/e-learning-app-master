import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeThemeData {
  themeData: boolean | any
}

const initialState: storeThemeData = {
  themeData: false,
}

export const storeThemeDataSlice = createSlice({
  name: 'theme data',
  initialState,
  reducers: {
    getThemeData: (state, action: PayloadAction<any>) => {
        state.themeData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getThemeData } = storeThemeDataSlice.actions

export default storeThemeDataSlice.reducer