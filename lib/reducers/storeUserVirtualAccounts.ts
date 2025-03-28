import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeUserVirtualAccounts {
  virtualAccounts: object | any
}

const initialState: storeUserVirtualAccounts = {
  virtualAccounts: null,
}

export const storeUserVirtualAccountsSlice = createSlice({
  name: 'user virtual accounts',
  initialState,
  reducers: {
    getUserVirtualAccounts: (state, action: PayloadAction<any>) => {
        state.virtualAccounts = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserVirtualAccounts } = storeUserVirtualAccountsSlice.actions

export default storeUserVirtualAccountsSlice.reducer