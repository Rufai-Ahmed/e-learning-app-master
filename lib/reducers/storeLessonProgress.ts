import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonProgressState {
  completedLessons: Record<string, boolean>;
  completedQuizzes: Record<string, boolean>;
}

const initialState: LessonProgressState = {
  completedLessons: {}, // { [lessonId]: true }
  completedQuizzes: {}, // { [moduleId]: true }
};

const storeLessonProgress = createSlice({
  name: "lessonProgress",
  initialState,
  reducers: {
    markLessonCompleted: (
      state,
      action: PayloadAction<{ lessonId: string }>
    ) => {
      state.completedLessons[action.payload.lessonId] = true;
    },
    markQuizCompleted: (state, action: PayloadAction<string>) => {
      state.completedQuizzes[action.payload] = true;
    },
    resetLessonProgress: (state) => {
      state.completedLessons = {};
      state.completedQuizzes = {};
    },
  },
});

export const { markLessonCompleted, markQuizCompleted, resetLessonProgress } =
  storeLessonProgress.actions;
export default storeLessonProgress.reducer;
