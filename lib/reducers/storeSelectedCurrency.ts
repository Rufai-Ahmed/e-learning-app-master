import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeSelectedCurrencyData {
  selectedCurrency: any,
  selectedCurrenyTo: any,
  selectedCurrencyFrom:any
}

const initialState: storeSelectedCurrencyData = {
  selectedCurrency: null,
  selectedCurrencyFrom: null,
  selectedCurrenyTo:null
}

export const storeSelectedCurrencyDataSlice = createSlice({
  name: 'selected currency',
  initialState,
  reducers: {
    getSelectedCurrencyData: (state, action: PayloadAction<any>) => {
        state.selectedCurrency = action.payload
    },
    getSelectedCurrencyToData: (state, action: PayloadAction<any>) => {
        state.selectedCurrenyTo = action.payload
    },
    getSelectedCurrencyFromData: (state, action: PayloadAction<any>) => {
        state.selectedCurrencyFrom = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getSelectedCurrencyData,getSelectedCurrencyToData, getSelectedCurrencyFromData } = storeSelectedCurrencyDataSlice.actions

export default storeSelectedCurrencyDataSlice.reducer