import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeWalletBalanceData {
  fiatBalances: object | any;
  payvoraCoin: object | any;
  walletBeneficiaries: object | any;
}

const initialState: storeWalletBalanceData = {
  fiatBalances: null,
  payvoraCoin: null,
  walletBeneficiaries: null
}

export const storeWalletBalanceDataSlice = createSlice({
  name: 'wallet balance data',
  initialState,
  reducers: {
    getFiatBalances: (state, action: PayloadAction<any>) => {
        state.fiatBalances = action.payload
    },
    getPayvoraCoin: (state, action: PayloadAction<any>) => {
      state.payvoraCoin = action.payload
  },
  getWalletBeneficiaries: (state, action: PayloadAction<any>) => {
    state.walletBeneficiaries = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { getPayvoraCoin, getFiatBalances, getWalletBeneficiaries } = storeWalletBalanceDataSlice.actions

export default storeWalletBalanceDataSlice.reducer