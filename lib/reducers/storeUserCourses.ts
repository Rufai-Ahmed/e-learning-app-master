import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeCoursesData {
  courses: any,
  courseDetails: any,
  categories: any
}

const initialState: storeCoursesData = {
  courses: null,
  courseDetails:null,
  categories:null
}

export const storeCoursesSlice = createSlice({
  name: 'user courses',
  initialState,
  reducers: {
    getCourses: (state, action: PayloadAction<any>) => {
        state.courses = action.payload
    },
    getCourseDetails: (state, action: PayloadAction<any>) => {
      state.courseDetails = action.payload
  },
  getCategories: (state, action: PayloadAction<any>) => {
    state.categories = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const { getCourseDetails,getCourses, getCategories } = storeCoursesSlice.actions

export default storeCoursesSlice.reducer