import { axios } from "../axios";

export const api = {
  verifyAccountDetails: async function (data: {
    account_bank: string;
    account_number: string;
    currency: string;
  }) {
    const response = await axios.post(`/utility/verify-account-details`, data);
    return response?.data?.data;
  },
  getBanks: async function () {
    const response = await axios.get(`/utility/get-banks`);
    return response?.data?.data;
  },
  createAccount: async function (body, roles) {
    const response = await axios.post("/auth/register", body, {
      headers: {
        Authorization: "",
      },
      params: {
        user_type: roles,
      },
    });
    return response?.data;
  },
  signinAccount: async function (data) {
    const response = await axios.post("/auth/login", data);
    return response?.data;
  },
  googleSignIn: async function (idToken: string, userType: string) {
    const response = await axios.post(
      "/auth/google/mobile",
      {
        token: idToken,
      },
      {
        params: {
          user_type: userType,
        },
      }
    );
    return response?.data;
  },
  verifyGoogleCallback: async function (queryParams) {
    const response = await axios.get("/auth/google/callback", {
      params: queryParams,
    });
    return response?.data;
  },
  sendVerificationEmail: async function (data) {
    const response = await axios.post("/auth/resend-verification-email", data);
    return response?.data;
  },
  sendForgotPwdVerificationEmail: async function (data) {
    const response = await axios.post("/auth/forgot-password", data);
    return response?.data;
  },
  verifyEmail: async function (data) {
    const response = await axios.post("/auth/verify-email", data);
    return response?.data;
  },
  resetPassword: async function (data) {
    const response = await axios.post("/auth/reset-password", data);
    return response?.data;
  },
  logoutUser: async function (id, token) {
    const response = await axios.get(`/auth/logout/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  topSearches: async function (id, token) {
    const response = await axios.get(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getCourseCertificate: async function (id, token) {
    const response = await axios.get(`/courses/${id}/certificate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  },
  handleCourseCategorySelection: async function (data, token) {
    const response = await axios.post("/users/category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  changePassword: async function (data, token) {
    const response = await axios.post("/auth/update-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  deleteAccount: async function (id, token) {
    console.log(id, token);
    const response = await axios.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user_id: id,
      },
    });
    return response?.data;
  },
  getAllCourses: async function (id, token) {
    const response = await axios.get(`/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getCoursesById: async function (id, token) {
    console.log(id, token);
    const response = await axios.get(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  updateCourseById: async function (id, token) {
    console.log(id, token);
    const response = await axios.put(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  deleteCoursesById: async function (id, token) {
    console.log(id, token);
    const response = await axios.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getUserCategories: async function (id, token) {
    console.log(id, token);
    const response = await axios.get(`/users/${id}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getUserCourses: async function (id, token) {
    const response = await axios.get(`/users/${id}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  rateCourseById: async function (id, token) {
    console.log(id, token);
    const response = await axios.post(`/courses/${id}/rate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getRatedCourseById: async function (id, token) {
    console.log(id, token);
    const response = await axios.get(`/courses/${id}/rate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  enrollCourseById: async function (id, token) {
    console.log(id, token);
    const response = await axios.post(`/courses/${id}/enroll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },

  createCourse: async function (body, token) {
    console.log(body, token);
    const response = await axios.post(`/courses`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  },
  createLearningObjectives: async function (id, body, token) {
    console.log(id, token);
    const response = await axios.post(`/courses/${id}/modules`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getLearningObjectives: async function (id, token) {
    console.log(id, token);
    const response = await axios.get(`/courses/${id}/modules`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  updateLearningObjectives: async function (id, token, userId) {
    console.log(id, token);
    const response = await axios.get(`/courses/${id}/modules/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  updateModule: async function (courseId, moduleId, data, token) {
    const response = await axios.put(
      `/courses/${courseId}/modules/${moduleId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  addLesson: async function (courseId, moduleId, data, token) {
    const response = await axios.post(
      `/courses/${courseId}/modules/${moduleId}/lessons`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  updateLesson: async function (courseId, moduleId, lessonId, data, token) {
    const response = await axios.put(
      `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  deleteLearningObjective: async function (id, token, userId) {
    console.log(id, token);
    const response = await axios.get(`/courses/${id}/modules/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  createCurriculum: async function (id, token, userId) {
    const response = await axios.get(`/courses/${id}/modules/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  uploadCourseVideo: async function (
    lessonId,
    token,
    courseId,
    moduleId,
    body
  ) {
    try {
      //    console.log(lessonId, 'id', token, 'tokn',body?._parts[0], 'body',courseId, 'courseid', moduleId, 'mod')

      //  console.log(body?._parts[0]?.[1])

      const response = await axios.post(
        `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/upload-video`,

        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response?.data, "dtaa")
      return response?.data;
    } catch (err) {
      console.error(
        "Error publishing course:",
        err.response?.data.detail[0].loc
      );
      console.log(err.response?.data);
    }
  },
  uploadCourseImage: async function (id, token, body) {
    try {
      console.log(id, token, body);
      const response = await axios.post(`/courses/${id}/upload-image`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data;
    } catch (err) {
      console.log(err);
    }
  },
  uploadUserImage: async function (id: string, token: string, body: FormData) {
    try {
      console.log(id, token, body);
      const response = await axios.post(`/users/${id}/upload-image`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data;
    } catch (err) {
      console.log(err);
    }
  },
  saveCourseEdit: async function (id, body, token) {
    const response = await axios.post(`/courses/${id}/modules`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getInstructorCourses: async function (id, token) {
    const response = await axios.get(`/instructors/${id}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  getInstructorTransactions: async function (id, token) {
    const response = await axios.get(`/instructors/${id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  addInstructorBankAccount: async function (instructorId, data, token) {
    const response = await axios.post(
      `/instructors/${instructorId}/bank-account`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  requestInstructorPayout: async function (instructorId, data, token) {
    const response = await axios.post(
      `/instructors/${instructorId}/request-payout`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  updateCourse: async function (id, body, token) {
    const response = await axios.put(`/courses/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  deleteCourse: async function (id, token) {
    const response = await axios.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
  buyCourse: async function (id, token) {
    const response = await axios.post(
      `/courses/${id}/enroll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  searchCourses: async function (name, token) {
    const response = await axios.get(`/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
      },
    });
    return response?.data;
  },
  submitQuiz: async function (
    courseId: string,
    moduleId: string,
    quizId: string,
    answers: { question_id: string; option_id: string }[],
    token: string
  ) {
    const response = await axios.post(
      `/courses/${courseId}/modules/${moduleId}/quiz/${quizId}/submit`,
      answers,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  getQuiz: async function (courseId: string, moduleId: string, token: string) {
    const response = await axios.get(
      `/courses/${courseId}/modules/${moduleId}/quiz`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  },
  getQuizById: async function (
    courseId: string,
    moduleId: string,
    quizId: string,
    token: string
  ) {
    const response = await axios.get(
      `/courses/${courseId}/modules/${moduleId}/quiz/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  },
  getModuleQuizzes: async function (
    courseId: string,
    moduleId: string,
    token: string
  ) {
    const response = await axios.get(
      `/courses/${courseId}/modules/${moduleId}/quiz`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  createQuiz: async function (
    courseId: string,
    moduleId: string,
    data: {
      questions: Array<{
        question: string;
        options: Array<{
          value: string;
          answer: boolean;
        }>;
      }>;
    },
    token: string
  ) {
    const response = await axios.post(
      `/courses/${courseId}/modules/${moduleId}/quiz`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  uploadLessonVideo: async function (
    courseId: string,
    moduleId: string,
    lessonId: string,
    videoData: FormData,
    token: string
  ) {
    const response = await axios.post(
      `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/upload-video`,
      videoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  },
  updateQuestion: async function (
    courseId: string,
    moduleId: string,
    quizId: string,
    questionId: string,
    data: { question: string },
    token: string
  ) {
    const response = await axios.put(
      `/courses/${courseId}/modules/${moduleId}/quiz/${quizId}/questions/${questionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  updateOption: async function (
    courseId: string,
    moduleId: string,
    quizId: string,
    questionId: string,
    optionId: string,
    data: { value: string; answer: boolean },
    token: string
  ) {
    const response = await axios.put(
      `/courses/${courseId}/modules/${moduleId}/quiz/${quizId}/questions/${questionId}/options/${optionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  },
  createQuestion: async function (
    courseId: string,
    moduleId: string,
    quizId: string,
    data: {
      question: string;
      options: Array<{
        value: string;
        answer: boolean;
      }>;
    },
    token: string
  ) {
    const response = await axios.post(
      `/courses/${courseId}/modules/${moduleId}/quiz/${quizId}/questions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
