"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var axios_1 = require("../axios");
exports.api = {
    createAccount: function (body, roles) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/register', body, {
                            headers: {
                                Authorization: ''
                            },
                            params: {
                                user_type: roles
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    signinAccount: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/login', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    sendVerificationEmail: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/resend-verification-email', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    sendForgotPwdVerificationEmail: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/forgot-password', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    verifyEmail: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/verify-email', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    resetPassword: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/reset-password', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    logoutUser: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/auth/logout/".concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    topSearches: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("", {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    handleCourseCategorySelection: function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/users/category', data, {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    changePassword: function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post('/auth/update-password', data, {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    deleteAccount: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.delete("/users/".concat(id), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                                params: {
                                    user_id: id
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getAllCourses: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/courses", {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getCoursesById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    updateCourseById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.put("/courses/".concat(id), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    deleteCoursesById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.delete("/courses/".concat(id), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getUserCategories: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/users/".concat(id, "/category"), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getUserCourses: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/users/".concat(id, "/courses"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    rateCourseById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/rate"), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getRatedCourseById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id, "/rate"), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    enrollCourseById: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/enroll"), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    createCourse: function (body, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body, token);
                        return [4 /*yield*/, axios_1.axios.post("/courses", body, {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    createLearningObjectives: function (id, body, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/modules"), body, {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getLearningObjectives: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id, "/modules"), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    updateLearningObjectives: function (id, token, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id, "/modules/").concat(userId), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    deleteLearningObjective: function (id, token, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id, token);
                        return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id, "/modules/").concat(userId), {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    createCurriculum: function (id, token, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/courses/".concat(id, "/modules/").concat(userId), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    uploadCourseVideo: function (lessonId, token, courseId, moduleId, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axios.post("/courses/".concat(courseId, "/modules/").concat(moduleId, "/lessons/").concat(lessonId, "/upload-video"), body, {
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                    "Content-Type": "multipart/form-data"
                                },
                            })
                            // console.log(response.data, "dtaa")
                        ];
                    case 1:
                        response = _a.sent();
                        // console.log(response.data, "dtaa")
                        return [2 /*return*/, response.data];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error publishing course:", err_1.response.data.detail[0].loc);
                        console.log(err_1.response.data);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    uploadCourseImage: function (id, token, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(id, token, body);
                        return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/image-upload"), body, {
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        console.log(response.data);
                        return [2 /*return*/, response.data];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Error publishing course:", err_2.response.data.detail[0].loc);
                        console.log(err_2.response.data);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    saveCourseEdit: function (id, body, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/modules"), body, {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getInstructorCourses: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/instructors/".concat(id, "/courses"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    updateCourse: function (id, body, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.put("/courses/".concat(id), body, {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    deleteCourse: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.delete("/courses/".concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    buyCourse: function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.post("/courses/".concat(id, "/enroll"), {}, {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    searchCourses: function (name, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.axios.get("/courses/".concat(name), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
};
