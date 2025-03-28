import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeSearchData {
  searchData: string | any,
  searchTerm: any
}

const initialState: storeSearchData = {
  searchData: [],
  searchTerm: null
}

export const storeSearchDataSlice = createSlice({
  name: 'search data',
  initialState,
  reducers: {
    getSearchData: (state, action: PayloadAction<any>) => {
        state.searchData = action.payload
    },
    getSearchTerm: (state, action: PayloadAction<any>) => {
        state.searchTerm = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { getSearchData, getSearchTerm } = storeSearchDataSlice.actions

export default storeSearchDataSlice.reducer