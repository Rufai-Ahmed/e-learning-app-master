"use client";

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRight,
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  X,
  Video,
  FileQuestion,
  Check,
  User,
  Upload,
  Trash2,
} from "lucide-react-native";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { router } from "expo-router";
import { convertUriToBlob } from "@/utils/generic";

// Types
type CourseDetails = {
  name: string;
  description: string;
  price: string;
  category: string[];
  isPublished: boolean;
  thumbnail: string | null;
};

type LearningObjective = {
  id: string;
  title: string;
  description: string;
};

type QuizOption = {
  id: string;
  value: string;
  answer: boolean;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

type Quiz = {
  id: string;
  questions: QuizQuestion[];
};

type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string | null;
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz | null;
};

type UserDetails = {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
};

type Tab = "course" | "user";
type CourseStep = "details" | "learning" | "modules" | "preview";

export default function CourseManagementScreen() {
  // Tab state
  const [activeTab, setActiveTab] = useState<Tab>("course");
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  // Course state
  const [courseStep, setCourseStep] = useState<CourseStep>("details");
  const [isLoading, setIsLoading] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    name: "",
    description: "",
    price: "",
    category: [],
    isPublished: false,
    thumbnail: null,
  });
  const [learningObjectives, setLearningObjectives] = useState<
    LearningObjective[]
  >([{ id: "1", title: "", description: "" }]);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [videoUrl, setVideoUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState<FormData | null>(null);

  // User state
  const [user, setUser] = useState<UserDetails>({
    id: "",
    name: "",
    email: "",
    profileImage: null,
  });

  // Error state
  const [errors, setErrors] = useState<{
    details: string[];
    learning: string[];
    modules: string[];
    user: string[];
  }>({
    details: [],
    learning: [],
    modules: [],
    user: [],
  });

  // Refs
  const scrollViewRef = useRef<ScrollView>(null);

  // Helper functions
  const validateCourseDetails = (): boolean => {
    const newErrors: string[] = [];

    if (!courseDetails.name.trim()) newErrors.push("Course name is required");
    if (!courseDetails.description.trim())
      newErrors.push("Course description is required");
    if (!courseDetails.price.trim()) newErrors.push("Course price is required");
    if (courseDetails.category?.length === 0)
      newErrors.push("At least one category is required");

    setErrors((prev) => ({ ...prev, details: newErrors }));
    return newErrors?.length === 0;
  };

  const validateLearningObjectives = (): boolean => {
    const newErrors: string[] = [];

    if (learningObjectives?.length === 0) {
      newErrors.push("At least one learning objective is required");
    } else {
      learningObjectives.forEach((objective, index) => {
        if (!objective.title.trim()) {
          newErrors.push(`Learning objective ${index + 1} title is required`);
        }
      });
    }

    setErrors((prev) => ({ ...prev, learning: newErrors }));
    return newErrors?.length === 0;
  };
  const validateModules = (): boolean => {
    const newErrors: string[] = [];

    if (modules?.length === 0) {
      newErrors.push("At least one module is required");
    } else {
      modules.forEach((module, moduleIndex) => {
        if (!module.title.trim()) {
          newErrors.push(`Module ${moduleIndex + 1} title is required`);
        }

        if (module.lessons?.length === 0) {
          newErrors.push(`Module ${moduleIndex + 1} needs at least one lesson`);
        } else {
          module.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson.title.trim()) {
              newErrors.push(
                `Lesson ${lessonIndex + 1} in Module ${
                  moduleIndex + 1
                } title is required`
              );
            }
            // if (!lesson.videoUrl) {
            //   newErrors.push(`Lesson ${lessonIndex + 1} in Module ${moduleIndex + 1} requires a video upload`)
            // }
          });
        }
      });
    }

    setErrors((prev) => ({ ...prev, modules: newErrors }));
    return newErrors?.length === 0;
  };

  const validateUser = (): boolean => {
    const newErrors: string[] = [];

    if (!user.id.trim()) newErrors.push("User ID is required");

    setErrors((prev) => ({ ...prev, user: newErrors }));
    return newErrors?.length === 0;
  };

  // Image picker functions
  const pickImage = async (type: "course" | "user") => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant camera roll permissions to upload an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets?.length > 0) {
      const imageUri = result.assets[0].uri;
      const fileName = imageUri.split("/").pop();
      const fileType = fileName?.split(".").pop();
      const blob = await convertUriToBlob(imageUri);

      const formData = new FormData();
      formData.append("image", blob, fileName);

      // Send formData to your server or API
      setImageUrl(formData);

      if (type === "course") {
        setCourseDetails((prev) => ({ ...prev, thumbnail: imageUri }));
      } else {
        setUser((prev) => ({ ...prev, profileImage: imageUri }));
      }
    }
  };

  // Add video picker function after the existing pickImage function
  const pickVideo = async (moduleId, lessonId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant camera roll permissions to upload a video."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets?.length > 0) {
      setIsLoading(true);

      try {
        const videoUri = result.assets[0].uri;
        const fileName = videoUri.split("/").pop() || "photo.jpg";

        const blob = await convertUriToBlob(videoUri);
        const formData = new FormData();
        formData.append("video", blob, fileName);

        setVideoUrl((prev) => [...prev, formData]);

        Alert.alert("Success", "Video selected successfully!");
      } catch (error) {
        console.error("Error selecting video:", error);
        Alert.alert("Error", "Failed to select video. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const submitCourse = async () => {
    const isDetailsValid = validateCourseDetails();
    const isLearningValid = validateLearningObjectives();
    const isModulesValid = validateModules();

    if (!isDetailsValid || !isLearningValid || !isModulesValid) {
      Alert.alert(
        "Validation Error",
        "Please fix all errors before publishing"
      );
      return;
    }

    setIsLoading(true);

    try {
      const body = {
        name: courseDetails.name,
        description: courseDetails.description,
        price: parseFloat(courseDetails.price),
        category: ["dod"],
        // thumbnail: courseDetails.thumbnail,
        // isPublished: courseDetails.isPublished,
        // learningObjectives: learningObjectives.map(lo => ({
        //   title: lo.title,
        //   description: lo.description
        // })),
        modules: modules.map((module) => ({
          title: module.title,
          description: module.description,
          lessons: module.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description || "kdpd",
            duration: lesson.duration || "0",
            // videoUrl: lesson.videoUrl
          })),
          quiz: module.quiz
            ? [
                {
                  questions: module.quiz.questions.map((question) => ({
                    question: question.question,
                    options: question.options.map((option) => ({
                      value: option.value,
                      answer: option.answer,
                    })),
                  })),
                },
              ]
            : null,
        })),
      };

      const course = await api.createCourse(body, userToken);

      console.log(course?.data.modules);

      console.log("here");
      const res = await updateVideosInAPI(
        course?.data.modules,
        videoUrl,
        userToken,
        course?.data.id
      );

      console.log(course?.data.id, "dess");

      const res2 = await api.uploadCourseImage(
        course?.data.id,
        userToken,
        imageUrl
      );

      console.log(res2, "res");

      Alert.alert("Success", "Course published successfully!");

      setCourseDetails({
        name: "",
        description: "",
        price: "",
        category: [],
        isPublished: false,
        thumbnail: null,
      });
      setLearningObjectives([{ id: "1", title: "", description: "" }]);

      setCourseStep("details");
      setModules([]);
      setImageUrl(null);
      setVideoUrl([]);
      router.push("/instructor/(tabs)/manage-courses");
    } catch (error) {
      console.error("Error publishing course:", error);
      Alert.alert("Error", "Failed to publish course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const updateVideosInAPI = async (
    modules: { id: string; lessons: { id: string }[] }[],
    videoUrls: string[],
    userToken: string,
    courseId: string
  ) => {
    try {
      console.log("called");
      for (const module of modules) {
        const moduleId = module.id; // Get module ID

        for (let i = 0; i < module.lessons?.length; i++) {
          const lessonId = module.lessons[i].id; // Get lesson ID
          const videoUrl = videoUrls[i] || null; // Ensure we have a corresponding video

          console.log(videoUrl, "video");
          if (videoUrl) {
            //  console.log(videoUrl, "calledhere ")

            const res = await api.uploadCourseVideo(
              lessonId,
              userToken,
              courseId,
              moduleId,
              videoUrl
            );

            console.log(res, "udush");
            return res;
          }
        }
      }

      Alert.alert("Success", "All videos updated in API!");
    } catch (error) {
      console.error("Error updating videos in API:", error.response?.data);
      console.error(
        "Error publishing course:",
        error.response?.data.detail[0].loc
      );
      Alert.alert("Error", "Failed to update videos. Please try again.");
    }
  };

  // API functions
  const createCourse = async () => {
    if (!validateCourseDetails()) {
      Alert.alert(
        "Validation Error",
        "Please fix the errors in the course details."
      );
      return;
    }

    try {
      setCourseStep("learning");
      Alert.alert("Success", "Course details saved successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      Alert.alert("Error", "Failed to create course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const saveLearningObjectives = async () => {
    if (!validateLearningObjectives()) {
      Alert.alert(
        "Validation Error",
        "Please fix the errors in the learning objectives."
      );
      return;
    }

    setIsLoading(true);

    try {
      setCourseStep("modules");
      Alert.alert("Success", "Learning objectives saved successfully!");
    } catch (error) {
      console.error("Error saving learning objectives:", error);
      Alert.alert(
        "Error",
        "Failed to save learning objectives. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveModules = async () => {
    if (!validateModules()) {
      Alert.alert("Validation Error", "Please fix the errors in the modules.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call

      setCourseStep("preview");
      Alert.alert("Success", "Course curriculum saved successfully!");
    } catch (error) {
      console.error("Error saving modules:", error);
      Alert.alert(
        "Error",
        "Failed to save course curriculum. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const uploadCourseImage = async () => {
    if (!courseId) {
      Alert.alert(
        "Error",
        "Course ID is missing. Please create a course first."
      );
      return;
    }

    if (!courseDetails.thumbnail) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would upload the image:

      //
      // await fetch(`your-api-url/courses/${courseId}/upload-image`, {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      Alert.alert("Success", "Course image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading course image:", error);
      Alert.alert("Error", "Failed to upload course image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Module and lesson management
  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${modules?.length + 1}`,
      description: "",
      lessons: [],
      quiz: null,
    };

    setModules([...modules, newModule]);
    setExpandedModule(newModule.id);

    // Scroll to bottom after adding
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const updateModule = (moduleId: string, field: keyof Module, value: any) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    );
  };

  const removeModule = (moduleId: string) => {
    Alert.alert(
      "Remove Module",
      "Are you sure you want to remove this module and all its content?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setModules(modules.filter((module) => module.id !== moduleId));
            if (expandedModule === moduleId) {
              setExpandedModule(null);
            }
          },
        },
      ]
    );
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      const newLesson: Lesson = {
        id: Date.now().toString(),
        title: `Lesson ${module.lessons?.length + 1}`,
        description: "",
        duration: "",
        videoUrl: null,
      };

      updateModule(moduleId, "lessons", [...module.lessons, newLesson]);
    }
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: any
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      const updatedLessons = module.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      );

      updateModule(moduleId, "lessons", updatedLessons);
    }
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      const updatedLessons = module.lessons.filter(
        (lesson) => lesson.id !== lessonId
      );
      updateModule(moduleId, "lessons", updatedLessons);
    }
  };

  const addQuiz = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        questions: [
          {
            id: Date.now().toString(),
            question: "",
            options: [
              { id: "1", value: "", answer: false },
              { id: "2", value: "", answer: false },
            ],
          },
        ],
      };

      updateModule(moduleId, "quiz", newQuiz);
    }
  };

  const removeQuiz = (moduleId: string) => {
    updateModule(moduleId, "quiz", null);
  };

  const addQuizQuestion = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const newQuestion: QuizQuestion = {
        id: Date.now().toString(),
        question: "",
        options: [
          { id: "1", value: "", answer: false },
          { id: "2", value: "", answer: false },
        ],
      };

      const updatedQuiz = {
        ...module.quiz,
        questions: [...module.quiz.questions, newQuestion],
      };

      updateModule(moduleId, "quiz", updatedQuiz);
    }
  };

  const updateQuizQuestion = (
    moduleId: string,
    questionId: string,
    field: keyof QuizQuestion,
    value: any
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const updatedQuestions = module.quiz.questions.map((question) =>
        question.id === questionId ? { ...question, [field]: value } : question
      );

      const updatedQuiz = {
        ...module.quiz,
        questions: updatedQuestions,
      };

      updateModule(moduleId, "quiz", updatedQuiz);
    }
  };

  const removeQuizQuestion = (moduleId: string, questionId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const updatedQuestions = module.quiz.questions.filter(
        (question) => question.id !== questionId
      );

      const updatedQuiz = {
        ...module.quiz,
        questions: updatedQuestions,
      };

      updateModule(moduleId, "quiz", updatedQuiz);
    }
  };

  const addQuizOption = (moduleId: string, questionId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const question = module.quiz.questions.find((q) => q.id === questionId);
      if (question) {
        const newOption: QuizOption = {
          id: Date.now().toString(),
          value: "",
          answer: false,
        };

        const updatedOptions = [...question.options, newOption];

        const updatedQuestions = module.quiz.questions.map((q) =>
          q.id === questionId ? { ...q, options: updatedOptions } : q
        );

        const updatedQuiz = {
          ...module.quiz,
          questions: updatedQuestions,
        };

        updateModule(moduleId, "quiz", updatedQuiz);
      }
    }
  };

  const updateQuizOption = (
    moduleId: string,
    questionId: string,
    optionId: string,
    field: keyof QuizOption,
    value: any
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const question = module.quiz.questions.find((q) => q.id === questionId);
      if (question) {
        const updatedOptions = question.options.map((option) =>
          option.id === optionId ? { ...option, [field]: value } : option
        );

        // If we're setting this option as the answer, make sure other options are not answers
        let finalOptions = updatedOptions;
        if (field === "answer" && value === true) {
          finalOptions = updatedOptions.map((option) =>
            option.id === optionId ? option : { ...option, answer: false }
          );
        }

        const updatedQuestions = module.quiz.questions.map((q) =>
          q.id === questionId ? { ...q, options: finalOptions } : q
        );

        const updatedQuiz = {
          ...module.quiz,
          questions: updatedQuestions,
        };

        updateModule(moduleId, "quiz", updatedQuiz);
      }
    }
  };

  const removeQuizOption = (
    moduleId: string,
    questionId: string,
    optionId: string
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && module.quiz) {
      const question = module.quiz.questions.find((q) => q.id === questionId);
      if (question) {
        // Don't allow removing if there are only 2 options
        if (question.options?.length <= 2) {
          Alert.alert("Error", "A question must have at least 2 options.");
          return;
        }

        const updatedOptions = question.options.filter(
          (option) => option.id !== optionId
        );

        const updatedQuestions = module.quiz.questions.map((q) =>
          q.id === questionId ? { ...q, options: updatedOptions } : q
        );

        const updatedQuiz = {
          ...module.quiz,
          questions: updatedQuestions,
        };

        updateModule(moduleId, "quiz", updatedQuiz);
      }
    }
  };

  // Category management
  const addCategory = () => {
    if (!categoryInput.trim()) return;

    if (!courseDetails.category.includes(categoryInput)) {
      setCourseDetails({
        ...courseDetails,
        category: [...courseDetails.category, categoryInput],
      });
    }

    setCategoryInput("");
  };

  const removeCategory = (category: string) => {
    setCourseDetails({
      ...courseDetails,
      category: courseDetails.category.filter((c) => c !== category),
    });
  };

  // Learning objectives management
  const addLearningObjective = () => {
    const newObjective: LearningObjective = {
      id: Date.now().toString(),
      title: "",
      description: "",
    };

    setLearningObjectives([...learningObjectives, newObjective]);
  };

  const updateLearningObjective = (
    id: string,
    field: keyof LearningObjective,
    value: string
  ) => {
    setLearningObjectives(
      learningObjectives.map((objective) =>
        objective.id === id ? { ...objective, [field]: value } : objective
      )
    );
  };

  const removeLearningObjective = (id: string) => {
    if (learningObjectives?.length <= 1) {
      Alert.alert("Error", "You must have at least one learning objective.");
      return;
    }

    setLearningObjectives(
      learningObjectives.filter((objective) => objective.id !== id)
    );
  };

  // Render functions
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "course" && styles.activeTab]}
        onPress={() => setActiveTab("course")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "course" && styles.activeTabText,
          ]}
        >
          Course Management
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {["details", "learning", "modules", "preview"].map((step, index) => (
        <React.Fragment key={step}>
          <TouchableOpacity
            style={[
              styles.progressStep,
              courseStep === step && styles.progressStepActive,
              courseStep === "learning" &&
                step === "details" &&
                styles.progressStepComplete,
              courseStep === "modules" &&
                (step === "details" || step === "learning") &&
                styles.progressStepComplete,
              courseStep === "preview" &&
                (step === "details" ||
                  step === "learning" ||
                  step === "modules") &&
                styles.progressStepComplete,
            ]}
            onPress={() => {
              // Only allow going back to previous steps
              if (
                (step === "learning" && courseStep === "modules") ||
                (step === "details" &&
                  (courseStep === "learning" || courseStep === "modules")) ||
                (step === "modules" && courseStep === "preview")
              ) {
                setCourseStep(step as CourseStep);
              }
            }}
          >
            <View
              style={[
                styles.progressNumber,
                courseStep === step && styles.progressNumberActive,
                courseStep === "learning" &&
                  step === "details" &&
                  styles.progressNumberComplete,
                courseStep === "modules" &&
                  (step === "details" || step === "learning") &&
                  styles.progressNumberComplete,
                courseStep === "preview" &&
                  (step === "details" ||
                    step === "learning" ||
                    step === "modules") &&
                  styles.progressNumberComplete,
              ]}
            >
              {(courseStep === "learning" && step === "details") ||
              (courseStep === "modules" &&
                (step === "details" || step === "learning")) ||
              (courseStep === "preview" &&
                (step === "details" ||
                  step === "learning" ||
                  step === "modules")) ? (
                <Check size={16} color="white" />
              ) : (
                <Text style={styles.progressNumberText}>{index + 1}</Text>
              )}
            </View>
            <Text
              style={[
                styles.progressText,
                courseStep === step && styles.progressTextActive,
              ]}
            >
              {step === "details"
                ? "Course Details"
                : step === "learning"
                ? "Learning Objectives"
                : step === "modules"
                ? "Course Modules"
                : "Preview"}
            </Text>
          </TouchableOpacity>
          {index < 3 && (
            <View
              style={[
                styles.progressLine,
                ((courseStep === "learning" && index === 0) ||
                  (courseStep === "modules" && index <= 1) ||
                  (courseStep === "preview" && index <= 2)) &&
                  styles.progressLineActive,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderErrors = (
    section: "details" | "learning" | "modules" | "user"
  ) => {
    const currentErrors = errors[section];
    if (currentErrors?.length === 0) return null;

    return (
      <View style={styles.errorsContainer}>
        {currentErrors.map((error, index) => (
          <Text key={index} style={styles.errorText}>
            • {error}
          </Text>
        ))}
      </View>
    );
  };

  const renderCourseDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Course Details</Text>
      <Text style={styles.sectionDescription}>
        Enter the basic information about your course
      </Text>

      {renderErrors("details")}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          style={styles.input}
          value={courseDetails.name}
          onChangeText={(text) =>
            setCourseDetails({ ...courseDetails, name: text })
          }
          placeholder="Enter course name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={courseDetails.description}
          onChangeText={(text) =>
            setCourseDetails({ ...courseDetails, description: text })
          }
          placeholder="Enter course description"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={courseDetails.price}
          onChangeText={(text) => {
            // Only allow numbers and decimal point
            const regex = /^\d*\.?\d*$/;
            if (regex.test(text) || text === "") {
              setCourseDetails({ ...courseDetails, price: text });
            }
          }}
          placeholder="Enter course price"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categories</Text>
        <View style={styles.categoryInputContainer}>
          <TextInput
            style={styles.categoryInput}
            value={categoryInput}
            onChangeText={setCategoryInput}
            placeholder="Add a category"
          />
          <TouchableOpacity
            style={styles.addCategoryButton}
            onPress={addCategory}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          {courseDetails.category.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{category}</Text>
              <TouchableOpacity onPress={() => removeCategory(category)}>
                <X size={16} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.thumbnailContainer}>
        <Text style={styles.label}>Course Thumbnail</Text>
        <TouchableOpacity
          style={styles.thumbnailButton}
          onPress={() => pickImage("course")}
        >
          {courseDetails.thumbnail ? (
            <Image
              source={{ uri: courseDetails.thumbnail }}
              style={styles.thumbnail}
            />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <ImageIcon size={24} color="#666" />
              <Text style={styles.thumbnailText}>Add Thumbnail</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.publishContainer}>
        <Text style={styles.label}>Publish Course</Text>
        <Switch
          value={courseDetails.isPublished}
          onValueChange={(value) =>
            setCourseDetails({ ...courseDetails, isPublished: value })
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={createCourse}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Course Details</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderLearningObjectives = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Learning Objectives</Text>
      <Text style={styles.sectionDescription}>
        What will students learn from this course?
      </Text>

      {renderErrors("learning")}

      {learningObjectives.map((objective, index) => (
        <View key={objective.id} style={styles.learningObjectiveItem}>
          <View style={styles.learningObjectiveHeader}>
            <Text style={styles.learningObjectiveNumber}>#{index + 1}</Text>
            <TouchableOpacity
              onPress={() => removeLearningObjective(objective.id)}
              style={styles.removeButton}
            >
              <X size={20} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={objective.title}
              onChangeText={(text) =>
                updateLearningObjective(objective.id, "title", text)
              }
              placeholder="Enter learning objective"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={objective.description}
              onChangeText={(text) =>
                updateLearningObjective(objective.id, "description", text)
              }
              placeholder="Enter detailed description"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addLearningObjective}>
        <Plus size={20} color="#4169E1" />
        <Text style={styles.addButtonText}>Add Learning Objective</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={saveLearningObjectives}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Learning Objectives</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderModules = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Course Modules</Text>
      <Text style={styles.sectionDescription}>
        Organize your course content into modules
      </Text>

      {renderErrors("modules")}

      {modules.map((module) => (
        <View key={module.id} style={styles.moduleContainer}>
          <TouchableOpacity
            style={styles.moduleHeader}
            onPress={() =>
              setExpandedModule(expandedModule === module.id ? null : module.id)
            }
          >
            <View style={styles.moduleTitleContainer}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <TouchableOpacity
                onPress={() => removeModule(module.id)}
                style={styles.removeButton}
              >
                <X size={20} color="#FF4444" />
              </TouchableOpacity>
            </View>
            <ChevronRight
              size={20}
              color="#666"
              style={{
                transform: [
                  { rotate: expandedModule === module.id ? "90deg" : "0deg" },
                ],
              }}
            />
          </TouchableOpacity>

          {expandedModule === module.id && (
            <View style={styles.moduleContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Module Title</Text>
                <TextInput
                  style={styles.input}
                  value={module.title}
                  onChangeText={(text) =>
                    updateModule(module.id, "title", text)
                  }
                  placeholder="Enter module title"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={module.description}
                  onChangeText={(text) =>
                    updateModule(module.id, "description", text)
                  }
                  placeholder="Enter module description"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.contentSection}>
                <Text style={styles.contentSectionTitle}>Lessons</Text>
                {module.lessons.map((lesson) => (
                  <View key={lesson.id} style={styles.contentItem}>
                    <View style={styles.contentItemHeader}>
                      <Video size={20} color="#4169E1" />
                      <View style={styles.contentItemTitles}>
                        <TextInput
                          style={styles.contentItemTitle}
                          value={lesson.title}
                          onChangeText={(text) =>
                            updateLesson(module.id, lesson.id, "title", text)
                          }
                          placeholder="Lesson title"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => removeLesson(module.id, lesson.id)}
                        style={styles.removeButton}
                      >
                        <X size={20} color="#FF4444" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.videoContainer}>
                      <Text style={styles.label}>Video</Text>
                      {videoUrl?.length > 0 ? (
                        <View style={styles.videoPreviewContainer}>
                          <View style={styles.videoPreview}>
                            <Video size={24} color="#4169E1" />
                            <Text
                              style={styles.videoUrlText}
                              numberOfLines={1}
                              ellipsizeMode="middle"
                            >
                              {lesson.videoUrl}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.changeVideoButton}
                            onPress={() => pickVideo(module.id, lesson.id)}
                          >
                            <Text style={styles.changeVideoButtonText}>
                              Change
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.uploadVideoButton}
                          onPress={() => pickVideo(module.id, lesson.id)}
                        >
                          <Upload size={20} color="#4169E1" />
                          <Text style={styles.uploadVideoButtonText}>
                            Upload Video
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addContentButton}
                  onPress={() => addLesson(module.id)}
                >
                  <Plus size={20} color="#4169E1" />
                  <Text style={styles.addContentButtonText}>Add Lesson</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contentSection}>
                <Text style={styles.contentSectionTitle}>Quiz</Text>
                {module.quiz ? (
                  <View style={styles.quizContainer}>
                    <View style={styles.quizHeader}>
                      <FileQuestion size={20} color="#4169E1" />
                      <Text style={styles.quizTitle}>Module Quiz</Text>
                      <TouchableOpacity
                        onPress={() => removeQuiz(module.id)}
                        style={styles.removeButton}
                      >
                        <X size={20} color="#FF4444" />
                      </TouchableOpacity>
                    </View>

                    {module.quiz.questions.map((question, qIndex) => (
                      <View key={question.id} style={styles.questionContainer}>
                        <View style={styles.questionHeader}>
                          <Text style={styles.questionNumber}>
                            Question {qIndex + 1}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              removeQuizQuestion(module.id, question.id)
                            }
                            style={styles.removeButton}
                          >
                            <X size={20} color="#FF4444" />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                          <TextInput
                            style={styles.input}
                            value={question.question}
                            onChangeText={(text) =>
                              updateQuizQuestion(
                                module.id,
                                question.id,
                                "question",
                                text
                              )
                            }
                            placeholder="Enter question"
                          />
                        </View>

                        <Text style={styles.optionsLabel}>
                          Options (select correct answer)
                        </Text>

                        {question.options.map((option) => (
                          <View key={option.id} style={styles.optionContainer}>
                            <TouchableOpacity
                              style={[
                                styles.optionRadio,
                                option.answer && styles.optionRadioSelected,
                              ]}
                              onPress={() =>
                                updateQuizOption(
                                  module.id,
                                  question.id,
                                  option.id,
                                  "answer",
                                  true
                                )
                              }
                            >
                              {option.answer && (
                                <View style={styles.optionRadioInner} />
                              )}
                            </TouchableOpacity>
                            <TextInput
                              style={styles.optionInput}
                              value={option.value}
                              onChangeText={(text) =>
                                updateQuizOption(
                                  module.id,
                                  question.id,
                                  option.id,
                                  "value",
                                  text
                                )
                              }
                              placeholder={`Option ${option.id}`}
                            />
                            <TouchableOpacity
                              onPress={() =>
                                removeQuizOption(
                                  module.id,
                                  question.id,
                                  option.id
                                )
                              }
                              style={styles.removeOptionButton}
                            >
                              <X size={16} color="#FF4444" />
                            </TouchableOpacity>
                          </View>
                        ))}

                        <TouchableOpacity
                          style={styles.addOptionButton}
                          onPress={() => addQuizOption(module.id, question.id)}
                        >
                          <Plus size={16} color="#4169E1" />
                          <Text style={styles.addOptionButtonText}>
                            Add Option
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}

                    <TouchableOpacity
                      style={styles.addQuestionButton}
                      onPress={() => addQuizQuestion(module.id)}
                    >
                      <Plus size={20} color="#4169E1" />
                      <Text style={styles.addQuestionButtonText}>
                        Add Question
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addContentButton}
                    onPress={() => addQuiz(module.id)}
                  >
                    <Plus size={20} color="#4169E1" />
                    <Text style={styles.addContentButtonText}>Add Quiz</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addModule}>
        <Plus size={20} color="#4169E1" />
        <Text style={styles.addButtonText}>Add Module</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={saveModules}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Course Modules</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderCoursePreview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Course Preview</Text>
      <Text style={styles.sectionDescription}>
        Review your course before publishing
      </Text>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Course Details</Text>
        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Name:</Text>
          <Text style={styles.previewValue}>{courseDetails.name}</Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Description:</Text>
          <Text style={styles.previewValue}>{courseDetails.description}</Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Price:</Text>
          <Text style={styles.previewValue}>${courseDetails.price}</Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Categories:</Text>
          <View style={styles.previewCategoriesContainer}>
            {courseDetails.category.map((category, index) => (
              <View key={index} style={styles.previewCategoryTag}>
                <Text style={styles.previewCategoryTagText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>Status:</Text>
          <Text
            style={[
              styles.previewValue,
              courseDetails.isPublished
                ? styles.publishedText
                : styles.draftText,
            ]}
          >
            {courseDetails.isPublished ? "Published" : "Draft"}
          </Text>
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Learning Objectives</Text>
        {learningObjectives.map((objective, index) => (
          <View key={objective.id} style={styles.previewObjective}>
            <Text style={styles.previewObjectiveNumber}>{index + 1}.</Text>
            <View style={styles.previewObjectiveContent}>
              <Text style={styles.previewObjectiveTitle}>
                {objective.title}
              </Text>
              <Text style={styles.previewObjectiveDescription}>
                {objective.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Course Structure</Text>
        {modules.map((module, moduleIndex) => (
          <View key={module.id} style={styles.previewModule}>
            <Text style={styles.previewModuleTitle}>
              Module {moduleIndex + 1}: {module.title}
            </Text>
            <Text style={styles.previewModuleDescription}>
              {module.description}
            </Text>

            <Text style={styles.previewSubtitle}>Lessons:</Text>
            {module.lessons.map((lesson, lessonIndex) => (
              <View key={lesson.id} style={styles.previewLesson}>
                <Text style={styles.previewLessonTitle}>
                  {lessonIndex + 1}. {lesson.title}{" "}
                  {lesson.duration ? `(${lesson.duration})` : ""}
                </Text>
                <Text style={styles.previewLessonDescription}>
                  {lesson.description}
                </Text>
                {lesson.videoUrl && (
                  <View style={styles.previewVideoContainer}>
                    <Video size={16} color="#4169E1" />
                    <Text style={styles.previewVideoText}>Video attached</Text>
                  </View>
                )}
              </View>
            ))}

            {module.quiz && (
              <>
                <Text style={styles.previewSubtitle}>Quiz:</Text>
                <Text style={styles.previewQuizInfo}>
                  {module.quiz.questions?.length} question
                  {module.quiz.questions?.length !== 1 ? "s" : ""}
                </Text>
              </>
            )}
          </View>
        ))}
      </View>

      {courseDetails.thumbnail && (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Course Thumbnail</Text>
          <Image
            source={{ uri: courseDetails.thumbnail }}
            style={styles.previewThumbnail}
          />

          <TouchableOpacity
            style={[
              styles.uploadButton,
              isLoading && styles.uploadButtonDisabled,
            ]}
            onPress={uploadCourseImage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Upload size={20} color="white" />
                <Text style={styles.uploadButtonText}>Upload Thumbnail</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.publishButton,
          courseDetails.isPublished && styles.unpublishButton,
        ]}
        onPress={submitCourse}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.publishButtonText}>
            {courseDetails.isPublished ? "Update Course" : "Publish Course"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (activeTab === "course") {
              if (courseStep === "details") {
                router.back();
              } else if (courseStep === "learning") {
                setCourseStep("details");
              } else if (courseStep === "modules") {
                setCourseStep("learning");
              } else if (courseStep === "preview") {
                setCourseStep("modules");
              }
            }
          }}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === "course"
            ? courseStep === "details"
              ? "Create Course"
              : courseStep === "learning"
              ? "Learning Objectives"
              : courseStep === "modules"
              ? "Course Modules"
              : "Course Preview"
            : ""}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} ref={scrollViewRef}>
        {activeTab === "course" && (
          <>
            {renderProgressBar()}
            {courseStep === "details" && renderCourseDetails()}
            {courseStep === "learning" && renderLearningObjectives()}
            {courseStep === "modules" && renderModules()}
            {courseStep === "preview" && renderCoursePreview()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  backButton: {
    padding: 4,
  },
  headerRight: {
    width: 32,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4169E1",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#4169E1",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  smallTextArea: {
    height: 60,
    textAlignVertical: "top",
  },
  categoryInputContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  addCategoryButton: {
    backgroundColor: "#4169E1",
    width: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryTagText: {
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  thumbnailContainer: {
    marginBottom: 20,
  },
  thumbnailButton: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  thumbnailText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  publishContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  progressStep: {
    flex: 1,
    alignItems: "center",
  },
  progressStepActive: {
    opacity: 1,
  },
  progressStepComplete: {
    opacity: 1,
  },
  progressNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  progressNumberActive: {
    backgroundColor: "#4169E1",
  },
  progressNumberComplete: {
    backgroundColor: "#4CAF50",
  },
  progressNumberText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  progressTextActive: {
    color: "#4169E1",
    fontWeight: "500",
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: "#4CAF50",
  },
  errorsContainer: {
    backgroundColor: "#FFF3F3",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFE5E5",
  },
  errorText: {
    color: "#FF4444",
    fontSize: 14,
    marginBottom: 4,
  },
  learningObjectiveItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  learningObjectiveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  learningObjectiveNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4169E1",
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#4169E1",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4169E1",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  moduleContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  moduleTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 16,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  moduleContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  contentSection: {
    marginTop: 16,
  },
  contentSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  contentItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contentItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemTitles: {
    flex: 1,
    marginLeft: 12,
  },
  contentItemTitle: {
    fontSize: 16,
    color: "#333",
  },
  contentItemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  lessonDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  addContentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#4169E1",
    borderRadius: 8,
  },
  addContentButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4169E1",
  },
  quizContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quizTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4169E1",
  },
  optionsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 8,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionRadioSelected: {
    borderColor: "#4169E1",
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4169E1",
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  removeOptionButton: {
    padding: 4,
    marginLeft: 8,
  },
  addOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginTop: 4,
  },
  addOptionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#4169E1",
  },
  addQuestionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#4169E1",
    borderRadius: 8,
    marginTop: 8,
  },
  addQuestionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4169E1",
  },
  previewCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  previewLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  previewValue: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  publishedText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  draftText: {
    color: "#FF9800",
    fontWeight: "500",
  },
  previewCategoriesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  previewCategoryTag: {
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  previewCategoryTagText: {
    fontSize: 12,
    color: "#333",
  },
  previewObjective: {
    flexDirection: "row",
    marginBottom: 12,
  },
  previewObjectiveNumber: {
    width: 20,
    fontSize: 14,
    fontWeight: "600",
    color: "#4169E1",
  },
  previewObjectiveContent: {
    flex: 1,
  },
  previewObjectiveTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  previewObjectiveDescription: {
    fontSize: 14,
    color: "#666",
  },
  previewModule: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  previewModuleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  previewModuleDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  previewSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 8,
    marginBottom: 8,
  },
  previewLesson: {
    marginLeft: 16,
    marginBottom: 8,
  },
  previewLessonTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  previewLessonDescription: {
    fontSize: 14,
    color: "#666",
  },
  previewQuizInfo: {
    marginLeft: 16,
    fontSize: 14,
    color: "#666",
  },
  previewThumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4169E1",
    padding: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  uploadButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  publishButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  publishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  unpublishButton: {
    backgroundColor: "#FF9800",
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  profileImageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  userActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  uploadUserImageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4169E1",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteUserButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4444",
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  videoContainer: {
    marginTop: 12,
  },
  uploadVideoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#4169E1",
    borderRadius: 8,
    backgroundColor: "#F0F8FF",
  },
  uploadVideoButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4169E1",
    fontWeight: "500",
  },
  videoPreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  videoPreview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  videoUrlText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  changeVideoButton: {
    backgroundColor: "#4169E1",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  changeVideoButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  previewVideoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  previewVideoText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4169E1",
  },
});
