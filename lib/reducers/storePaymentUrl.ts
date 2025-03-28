import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storePaymentUrl {
  paymentUrl: string | any,
  paymentMethod:any,
  paymentBank: any
}

const initialState: storePaymentUrl = {
  paymentUrl: '',
  paymentMethod: [],
  paymentBank: []
}

export const storePaymentUrlSlice = createSlice({
  name: 'payment url',
  initialState,
  reducers: {
    getPaymentUrl: (state, action: PayloadAction<any>) => {
        state.paymentUrl = action.payload
    },
    getPaymentMethod: (state, action: PayloadAction<any>) => {
      state.paymentMethod = action.payload
  },
  getPaymentBanks: (state, action: PayloadAction<any>) => {
    state.paymentBank = action.payload
}
  }
})

// Action creators are generated for each case reducer function
export const { getPaymentUrl, getPaymentMethod, getPaymentBanks } = storePaymentUrlSlice.actions

export default storePaymentUrlSlice.reducer