import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeUserInfo {
    verifyPhonePurpose: any
}

const initialState: storeUserInfo = {
  verifyPhonePurpose: null
}

export const storeVerifyPhoneSlice = createSlice({
  name: 'verify phone',
  initialState,
  reducers: {
    getVerifyPhonePurpose: (state, action: PayloadAction<any>) => {
        state.verifyPhonePurpose = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getVerifyPhonePurpose} = storeVerifyPhoneSlice.actions

export default storeVerifyPhoneSlice.reducer