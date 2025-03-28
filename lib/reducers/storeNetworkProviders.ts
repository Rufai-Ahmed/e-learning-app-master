import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeNetworkProviders {
  networkProviders: object | any
}

const initialState: storeNetworkProviders = {
  networkProviders: null,
}

export const storeNetworkProvidersSlice = createSlice({
  name: 'network providers',
  initialState,
  reducers: {
    getNetworkProviders: (state, action: PayloadAction<any>) => {
        state.networkProviders = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getNetworkProviders } = storeNetworkProvidersSlice.actions

export default storeNetworkProvidersSlice.reducer