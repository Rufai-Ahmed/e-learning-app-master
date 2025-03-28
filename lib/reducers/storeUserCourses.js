"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.getCourses = exports.getCourseDetails = exports.storeCoursesSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    courses: null,
    courseDetails: null,
    categories: null
};
exports.storeCoursesSlice = (0, toolkit_1.createSlice)({
    name: 'user courses',
    initialState: initialState,
    reducers: {
        getCourses: function (state, action) {
            state.courses = action.payload;
        },
        getCourseDetails: function (state, action) {
            state.courseDetails = action.payload;
        },
        getCategories: function (state, action) {
            state.categories = action.payload;
        },
    },
});
// Action creators are generated for each case reducer function
exports.getCourseDetails = (_a = exports.storeCoursesSlice.actions, _a.getCourseDetails), exports.getCourses = _a.getCourses, exports.getCategories = _a.getCategories;
exports.default = exports.storeCoursesSlice.reducer;
