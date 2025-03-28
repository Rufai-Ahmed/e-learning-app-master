import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeGiftCardData {
  giftcardDetails: object | any
}

const initialState: storeGiftCardData = {
  giftcardDetails: null,
}

export const storeGiftCardDatasSlice = createSlice({
  name: 'giftcard data',
  initialState,
  reducers: {
    getGiftcardDetails: (state, action: PayloadAction<any>) => {
        state.giftcardDetails = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getGiftcardDetails } = storeGiftCardDatasSlice.actions

export default storeGiftCardDatasSlice.reducer