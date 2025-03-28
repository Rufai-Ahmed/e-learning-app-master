import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeBanksData {
  bankData:  any,
  selectBank: any,
  userBank: any,
  bankDetails: any,
  bankBeneficiaries: any
}

const initialState: storeBanksData = {
  bankData: null,
  selectBank: null,
  userBank:null,
  bankDetails:null,
  bankBeneficiaries:null
}

export const storeBanksDataSlice = createSlice({
  name: 'selected bank',
  initialState,
  reducers: {
    getBanksData: (state, action: PayloadAction<any>) => {
        state.bankData = action.payload
    },
    getSelectedBank: (state, action: PayloadAction<any>) => {
        state.selectBank = action.payload
    },
    getUserBank: (state, action: PayloadAction<any>) => {
        state.userBank = action.payload
    },
    getUserBankDetails: (state, action: PayloadAction<any>) => {
        state.bankDetails = action.payload
    },
    getBankBeneficiaries: (state, action: PayloadAction<any>) => {
        state.bankBeneficiaries = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getBanksData, getUserBank,getSelectedBank, getUserBankDetails, getBankBeneficiaries } = storeBanksDataSlice.actions

export default storeBanksDataSlice.reducer