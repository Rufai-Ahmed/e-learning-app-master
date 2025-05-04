import { createSlice } from "@reduxjs/toolkit";

interface LessonProgressState {
  completedLessons: Record<string, boolean>;
}

const initialState: LessonProgressState = {
  completedLessons: {}, // { [lessonId]: true }
};

const storeLessonProgress = createSlice({
  name: "lessonProgress",
  initialState,
  reducers: {
    markLessonCompleted: (state, action) => {
      state.completedLessons[action.payload.lessonId] = true;
    },
    resetLessonProgress: (state) => {
      state.completedLessons = {};
    },
  },
});

export const { markLessonCompleted, resetLessonProgress } =
  storeLessonProgress.actions;
export default storeLessonProgress.reducer;
