import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeTransferFundsData {
  transferUserId:  any,
  transferAmount: any,
  transferType: any,
  transferTrackingId: any,
  transferRepaymentSchedule: any
}

const initialState: storeTransferFundsData = {
  transferUserId:null,
  transferAmount: 0,
  transferType:null,
  transferTrackingId: null,
  transferRepaymentSchedule: null
}

export const storeTransferFundsDataSlice = createSlice({
  name: 'transfer funds',
  initialState,
  reducers: {
    getTransferUserId: (state, action: PayloadAction<any>) => {
        state.transferUserId = action.payload
    },
    getTransferAmount: (state, action: PayloadAction<any>) => {
      state.transferAmount = action.payload
  },
  getTransferType: (state, action: PayloadAction<any>) => {
    state.transferType = action.payload
},
getTransferTrackingId: (state, action: PayloadAction<any>) => {
  state.transferTrackingId = action.payload
},
getTransferRepaymentSchedule: (state, action: PayloadAction<any>) => {
  state.transferRepaymentSchedule = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const { getTransferUserId, getTransferAmount,getTransferRepaymentSchedule, getTransferType, getTransferTrackingId} = storeTransferFundsDataSlice.actions

export default storeTransferFundsDataSlice.reducer