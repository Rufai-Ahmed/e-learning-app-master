import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeNotificationData {
  notificationUnreadCount: any,
  notificationData: any,
  notificationId: any
}

const initialState: storeNotificationData = {
  notificationUnreadCount: 0,
  notificationData: [],
  notificationId: null
}

export const storeNotificationDataSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationUnreadCount: (state, action: PayloadAction<any>) => {
        state.notificationUnreadCount = action.payload
    },
    getNotificationData: (state, action: PayloadAction<any>) => {
        state.notificationData = action.payload
    },
    getNotificationId: (state, action: PayloadAction<any>) => {
      state.notificationId = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { getNotificationUnreadCount,getNotificationData , getNotificationId} = storeNotificationDataSlice.actions

export default storeNotificationDataSlice.reducer