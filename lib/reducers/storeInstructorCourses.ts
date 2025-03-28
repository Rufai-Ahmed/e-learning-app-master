import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface storeInstructorCoursesData {
  courses: any,
}

const initialState: storeInstructorCoursesData = {
  courses: [],
}

export const storeInstructorCoursesSlice = createSlice({
  name: 'instructor courses',
  initialState,
  reducers: {
    getInstructorCourses: (state, action: PayloadAction<any>) => {
        state.courses = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInstructorCourses } = storeInstructorCoursesSlice.actions

export default storeInstructorCoursesSlice.reducer