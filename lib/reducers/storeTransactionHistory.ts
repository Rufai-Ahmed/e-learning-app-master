import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionHistoryData {
  transactionHistoryData:  any,
  transactionHistoryDetails: any,
}

const initialState: storeTransactionHistoryData = {
  transactionHistoryData:null,
  transactionHistoryDetails: null
}

export const storeTransactionHistoryDataSlice = createSlice({
  name: 'transaction history',
  initialState,
  reducers: {
    getTransactionHistoryData: (state, action: PayloadAction<any>) => {
        state.transactionHistoryData = action.payload
    },
    getTransactionHistoryDetails: (state, action: PayloadAction<any>) => {
      state.transactionHistoryDetails = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionHistoryData, getTransactionHistoryDetails} = storeTransactionHistoryDataSlice.actions

export default storeTransactionHistoryDataSlice.reducer