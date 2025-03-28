import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeUserSession {
  session: object | any
}

const initialState: storeUserSession = {
  session: null,
}

export const storeUserSessionSlice = createSlice({
  name: 'user session',
  initialState,
  reducers: {
    getUserSession: (state, action: PayloadAction<any>) => {
        state.session = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserSession } = storeUserSessionSlice.actions

export default storeUserSessionSlice.reducer