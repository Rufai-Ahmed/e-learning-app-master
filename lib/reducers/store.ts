import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./storeCourse";
import userReducer from "./storeUser";
import lessonProgressReducer from "./storeLessonProgress";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    user: userReducer,
    lessonProgress: lessonProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
