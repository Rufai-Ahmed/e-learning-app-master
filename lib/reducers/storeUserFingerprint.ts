import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeUserFingerprint {
  userFingerprintLogins: string,
  userFingerprintPin: any
}

const initialState: storeUserFingerprint = {
  userFingerprintLogins: '',
  userFingerprintPin:null
}

export const storeUserFingerprintSlice = createSlice({
  name: 'user fingerprint',
  initialState,
  reducers: {
    getUserFingerprintLogins: (state, action: PayloadAction<string>) => {
        state.userFingerprintLogins = action.payload
    },
    getUserFingerprintPin: (state, action: PayloadAction<string>) => {
      state.userFingerprintPin = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { getUserFingerprintLogins,getUserFingerprintPin } = storeUserFingerprintSlice.actions

export default storeUserFingerprintSlice.reducer