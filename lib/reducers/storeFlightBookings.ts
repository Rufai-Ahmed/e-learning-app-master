import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeFlightBookingsData {
  flightBookingsData:  any,
  recentFlightPurchasesData: any,
  flightCurrency: any
}

const initialState: storeFlightBookingsData = {
  flightBookingsData: null,
  recentFlightPurchasesData: null,
  flightCurrency: null
}

export const storeFlightBookingsDataSlice = createSlice({
  name: 'flight bookings',
  initialState,
  reducers: {
    getFlightBookingsData: (state, action: PayloadAction<any>) => {
        state.flightBookingsData = action.payload
    },
    getFlightPurchasesData: (state, action: PayloadAction<any>) => {
      state.recentFlightPurchasesData = action.payload
  },
  getFlightCurrencyData: (state, action: PayloadAction<any>) => {
    state.flightCurrency = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const { getFlightBookingsData, getFlightPurchasesData, getFlightCurrencyData } = storeFlightBookingsDataSlice.actions

export default storeFlightBookingsDataSlice.reducer