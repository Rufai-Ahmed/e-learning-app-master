import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeBanksData {
  receiptData:  any,
}

const initialState: storeBanksData = {
  receiptData: null,
}

export const storeBillsReceiptDataSlice = createSlice({
  name: 'receipt data',
  initialState,
  reducers: {
    getReceiptData: (state, action: PayloadAction<any>) => {
        state.receiptData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getReceiptData } = storeBillsReceiptDataSlice.actions

export default storeBillsReceiptDataSlice.reducer