import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeCardDetails {
  cardDetails: object | any
}

const initialState: storeCardDetails = {
  cardDetails: {},
}

export const storeCardDetailsSlice = createSlice({
  name: 'card details',
  initialState,
  reducers: {
    getCardDetails: (state, action: PayloadAction<any>) => {
        state.cardDetails = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getCardDetails } = storeCardDetailsSlice.actions

export default storeCardDetailsSlice.reducer