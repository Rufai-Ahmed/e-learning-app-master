import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransactionData {
  transactionData:  any,
  transactionType: any,
  transactionReceiptData: any,
}

const initialState: storeTransactionData = {
  transactionData:null,
  transactionType: null,
  transactionReceiptData: null
}

export const storeTransactionsDataSlice = createSlice({
  name: 'transaction data',
  initialState,
  reducers: {
    getTransactionData: (state, action: PayloadAction<any>) => {
        state.transactionData = action.payload
    },
    getTransactionType: (state, action: PayloadAction<any>) => {
      state.transactionType = action.payload
  },
  getTransactionReceiptData: (state, action: PayloadAction<any>) => {
    state.transactionReceiptData = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const { getTransactionData, getTransactionType, getTransactionReceiptData} = storeTransactionsDataSlice.actions

export default storeTransactionsDataSlice.reducer