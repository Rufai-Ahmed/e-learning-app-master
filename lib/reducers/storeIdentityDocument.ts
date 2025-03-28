import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeIdentityDocument {
  document: object | any
}

const initialState: storeIdentityDocument = {
  document: {},
}

export const storeIdentityDocumentSlice = createSlice({
  name: 'identity document',
  initialState,
  reducers: {
    getIdentitydocument: (state, action: PayloadAction<any>) => {
        state.document = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getIdentitydocument } = storeIdentityDocumentSlice.actions

export default storeIdentityDocumentSlice.reducer