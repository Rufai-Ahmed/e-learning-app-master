import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeSuccessData {
  successData:  any,
  successDataType: any,
}

const initialState: storeSuccessData = {
  successData: null,
  successDataType: null
}

export const storeSuccessDataSlice = createSlice({
  name: 'success data',
  initialState,
  reducers: {
    getSuccessData: (state, action: PayloadAction<any>) => {
        state.successData = action.payload
    },
    getSuccessDataType: (state, action: PayloadAction<any>) => {
        state.successDataType = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getSuccessData, getSuccessDataType } = storeSuccessDataSlice.actions

export default storeSuccessDataSlice.reducer