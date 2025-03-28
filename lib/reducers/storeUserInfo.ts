import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeUserInfo {
  user: any,
  userForgottenEmail: string;
  userPinEnabled: boolean;
  userBankAccounts: any,
  verifyOtpType: any
  userLoginToken: any
  userPinToken: any
}

const initialState: storeUserInfo = {
  user: null,
  userForgottenEmail:'',
  userPinEnabled: true,
  userBankAccounts: null,
  verifyOtpType: null,
  userLoginToken:null,
  userPinToken:null
}

export const storeUserInfoSlice = createSlice({
  name: 'user info',
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<object>) => {
        state.user = action.payload
    },
    getUserForgottenEmail: (state, action: PayloadAction<string>) => {
        state.userForgottenEmail = action.payload
    },
    getUserPinEnabled:  (state, action: PayloadAction<boolean>) => {
      state.userPinEnabled = action.payload
  },
  getUserBankAccounts:  (state, action: PayloadAction<boolean>) => {
    state.userBankAccounts = action.payload
},
getVerifyOtpType:  (state, action: PayloadAction<string>) => {
  state.verifyOtpType = action.payload
},
getUserLoginToken:  (state, action: PayloadAction<boolean>) => {
  state.userLoginToken = action.payload
},
getUserPinToken:  (state, action: PayloadAction<boolean>) => {
  state.userPinToken = action.payload
}

  },
})

// Action creators are generated for each case reducer function
export const { getUserInfo, getUserBankAccounts, getUserLoginToken, getUserPinToken, getUserForgottenEmail, getVerifyOtpType, getUserPinEnabled } = storeUserInfoSlice.actions

export default storeUserInfoSlice.reducer