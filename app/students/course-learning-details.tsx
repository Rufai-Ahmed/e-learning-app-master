"use client";

import { AlertType } from "@/components/CustomAlert";
import { useAlert } from "@/hooks/useAlert";
import { useAppSelector } from "@/hooks/useAppSelector";
import { api } from "@/lib/actions/api";
import { Course, Module, Quiz } from "@/lib/interfaces/course";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Save,
  Star,
  Users,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageStyle,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface RootState {
  courses: {
    courseDetails: any;
  };
  user: {
    userLoginToken: string;
    user: {
      id: string;
    };
  };
}

const { width } = Dimensions.get("window");
const tabs = ["Overview", "Curriculum", "Reviews", "Quizzes", "Info"];

interface TabPositions {
  [key: string]: { x: number; width: number };
}

interface NavigationProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

type Styles = {
  quizButton: ViewStyle;
  quizButtonCompleted: ViewStyle;
  quizButtonLoader: ViewStyle;
  quizButtonContent: ViewStyle;
  quizButtonText: TextStyle;
  quizButtonSubtext: TextStyle;
  quizButtonIcon: ViewStyle;
  quizButtonArrow: ViewStyle;
  container: ViewStyle;
  backButton: ViewStyle;
  headerContainer: ViewStyle;
  courseImage: ImageStyle;
  imagePlaceholder: ViewStyle;
  imagePlaceholderText: TextStyle;
  tabsWrapper: ViewStyle;
  tabsContainer: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  activeTabText: TextStyle;
  indicator: ViewStyle;
  contentContainer: ViewStyle;
  tabContent: ViewStyle;
  courseTitle: TextStyle;
  courseDescription: TextStyle;
  instructorContainer: ViewStyle;
  instructorImage: ViewStyle;
  instructorName: TextStyle;
  price: TextStyle;
  rating: TextStyle;
  categoriesContainer: ViewStyle;
  categoryBadge: ViewStyle;
  categoryText: TextStyle;
  moduleContainer: ViewStyle;
  moduleHeader: ViewStyle;
  moduleTitle: TextStyle;
  moduleDescription: TextStyle;
  completedBadge: ViewStyle;
  completedText: TextStyle;
  lessonItem: ViewStyle;
  completedLessonItem: ViewStyle;
  lessonTitle: TextStyle;
  lessonCompletedIcon: ViewStyle;
  lessonCompletedText: TextStyle;
  moduleEditForm: ViewStyle;
  moduleEditInput: TextStyle;
  moduleEditTextArea: TextStyle;
  moduleEditActions: ViewStyle;
  moduleEditButton: ViewStyle;
  cancelButton: ViewStyle;
  saveButton: ViewStyle;
  moduleEditButtonText: TextStyle;
  infoText: TextStyle;
  placeholderText: TextStyle;
  loadingIndicator: ViewStyle;
  quizCard: ViewStyle;
  quizCardHeader: ViewStyle;
  quizCardTitle: TextStyle;
  quizCardDescription: TextStyle;
  quizCompletedBadge: ViewStyle;
  quizCompletedText: TextStyle;
};

// Update the QuizButton component to handle the new API flow
const QuizButton = ({
  module,
  course,
  userLoginToken,
  quizCompletionStatus,
}: {
  module: Module;
  course: Course | null;
  userLoginToken: string;
  quizCompletionStatus: { [key: string]: boolean };
}) => {
  const [hasQuiz, setHasQuiz] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const isCompleted = quizCompletionStatus[module.id];
  const { showAlert } = useAlert();

  useEffect(() => {
    const checkQuiz = async () => {
      if (!course?.id || !userLoginToken) return;

      try {
        const quizResponse = await api.getModuleQuizzes(
          course.id,
          module.id,
          userLoginToken
        );
        setHasQuiz(!!quizResponse?.data?.[0]?.id);

        if (quizResponse?.data?.[0]?.id) {
          const quizDetails = await api.getQuizById(
            course.id,
            module.id,
            quizResponse.data[0].id,
            userLoginToken
          );
          setQuizData(quizDetails || null);
        }
      } catch (error) {
        console.error("Error checking quiz:", error);
        setHasQuiz(false);
      }
    };
    checkQuiz();
  }, [module.id, course?.id, userLoginToken]);

  const handleQuizPress = async () => {
    console.log({ quizData, course, userLoginToken }, "quizData");
    if (!course?.id || !userLoginToken || !quizData) return;

    try {
      setIsLoading(true);
      router.push({
        pathname: "/students/quiz",
        params: {
          quiz: JSON.stringify(quizData),
          moduleId: module.id,
          courseId: course.id,
          onComplete: "markQuizAsCompleted",
        },
      });
    } catch (error) {
      console.error("Error navigating to quiz:", error);
      showAlert("error" as AlertType, "Failed to load quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasQuiz) return null;

  return (
    <TouchableOpacity
      style={[styles.quizButton, isCompleted && styles.quizButtonCompleted]}
      onPress={handleQuizPress}
      disabled={isLoading || isCompleted}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.quizButtonLoader} />
      ) : (
        <View style={styles.quizButtonContent}>
          <Text style={styles.quizButtonText}>
            {isCompleted ? "Quiz Completed" : "Take Quiz"}
          </Text>
          <Text style={styles.quizButtonSubtext}>
            {isCompleted
              ? "You have completed this quiz"
              : `Test your knowledge (${
                  quizData?.questions?.length || 0
                } questions)`}
          </Text>
          <View style={styles.quizButtonIcon}>
            <BookOpen size={24} color="#FFFFFF" />
          </View>
          <View style={styles.quizButtonArrow}>
            <ArrowLeft size={20} color="#FFFFFF" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function CourseDetailScreen() {
  const course = useAppSelector(
    (state: RootState) => state.courses.courseDetails
  );
  const userLoginToken = useAppSelector(
    (state: RootState) => state.user.userLoginToken
  );
  const userId = useAppSelector((state: RootState) => state.user.user?.id);
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const scrollViewRef = useRef<ScrollView>(null);
  const tabPositions = useRef<TabPositions>({});
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [moduleCompletionStatus, setModuleCompletionStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [editingModule, setEditingModule] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showAlert } = useAlert();
  const [quizCompletionStatus, setQuizCompletionStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [loadingQuiz, setLoadingQuiz] = useState<string | null>(null);
  const [moduleQuizzes, setModuleQuizzes] = useState([]);

  const params = useLocalSearchParams<{
    action?: "markQuizCompleted";
    moduleId?: string;
  }>();

  useEffect(() => {
    if (params.action === "markQuizCompleted" && params.moduleId) {
      markQuizAsCompleted(params.moduleId);

      router.setParams({ action: undefined, moduleId: undefined });
    }
  }, [params]);

  const fetchModuleQuizzes = async (modules: Module[]) => {
    if (!course?.id || !userLoginToken) return;

    try {
      const quizzes: { [key: string]: Quiz | null } = {};

      for (const module of modules) {
        try {
          const quizData = await api.getQuiz(
            course.id,
            module.id,
            userLoginToken
          );

          setModuleQuizzes(quizData);
        } catch (error) {
          console.error(`Error fetching quiz for module ${module.id}:`, error);
          quizzes[module.id] = null;
        }
      }
    } catch (error) {
      console.error("Error fetching module quizzes:", error);
    }
  };

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await api.getCoursesById(course?.id, userLoginToken);
      console.log(response, "response");
      setCourseDetails(response?.data);

      if (response?.data?.modules) {
        await Promise.all([
          fetchModuleCompletionStatus(response.data.modules),
          fetchModuleQuizzes(response.data.modules),
        ]);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleCompletionStatus = async (modules: Module[]) => {
    if (!userId || !course?.id) return;

    try {
      const completionStatus: { [key: string]: boolean } = {};

      for (const module of modules) {
        try {
          const response = await api.getLearningObjectives(
            course.id,
            userLoginToken
          );

          const isCompleted = response?.data?.some(
            (completedModule: Module) =>
              completedModule.id === module.id && completedModule.completed
          );

          completionStatus[module.id] = isCompleted || false;
        } catch (error) {
          console.error(
            `Error checking completion for module ${module.id}:`,
            error
          );
          completionStatus[module.id] = false;
        }
      }

      setModuleCompletionStatus(completionStatus);
    } catch (error) {
      console.error("Error fetching module completion status:", error);
    }
  };

  const markModuleAsCompleted = async (moduleId: string) => {
    if (!userId || !course?.id) return;

    try {
      await api.updateModule(
        course.id,
        moduleId,
        {
          completed: true,
        },
        userLoginToken
      );

      setModuleCompletionStatus((prev) => ({
        ...prev,
        [moduleId]: true,
      }));

      const allModulesCompleted = courseDetails?.modules.every(
        (module: Module) =>
          moduleCompletionStatus[module.id] || module.id === moduleId
      );

      if (allModulesCompleted) {
        console.log("Congratulations! Course completed!");
      }
    } catch (error) {
      console.error("Error marking module as completed:", error);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return false;
  };

  const markLessonAsCompleted = async (moduleId: string, lessonId: string) => {
    if (!userId || !course?.id) return;

    try {
      const module = courseDetails?.modules.find((m: any) => m.id === moduleId);
      if (module) {
        const allLessonsCompleted = module.lessons.every(
          (lesson: any) =>
            isLessonCompleted(lesson.id) || lesson.id === lessonId
        );

        if (allLessonsCompleted) {
          await markModuleAsCompleted(moduleId);
        }
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  };

  const isQuizCompleted = (moduleId: string) => {
    return quizCompletionStatus[moduleId] || false;
  };

  const markQuizAsCompleted = async (moduleId: string) => {
    if (!userId || !course?.id) return;

    try {
      setQuizCompletionStatus((prev) => ({
        ...prev,
        [moduleId]: true,
      }));

      const module = courseDetails?.modules.find((m) => m.id === moduleId);
      if (module) {
        const allLessonsCompleted = module.lessons.every((lesson) =>
          isLessonCompleted(lesson.id)
        );

        if (allLessonsCompleted) {
          await markModuleAsCompleted(moduleId);
        }
      }
    } catch (error) {
      console.error("Error marking quiz as completed:", error);
    }
  };

  const updateModule = async (
    moduleId: string,
    title: string,
    description: string
  ) => {
    if (!course?.id || !userLoginToken) return;

    try {
      setIsEditing(true);
      const response = await api.updateModule(
        course.id,
        moduleId,
        {
          title,
          description,
        },
        userLoginToken
      );

      if (response?.data) {
        setCourseDetails((prevCourse) => {
          if (!prevCourse) return null;

          return {
            ...prevCourse,
            modules: prevCourse.modules.map((module) =>
              module.id === moduleId
                ? { ...module, title, description }
                : module
            ),
          };
        });

        showAlert("success", "Module updated successfully");
        setEditingModule(null);
      }
    } catch (error: any) {
      console.error("Error updating module:", error);
      showAlert(
        "error",
        error?.response?.data?.message || "Failed to update module"
      );
    } finally {
      setIsEditing(false);
    }
  };

  const startEditingModule = (module: any) => {
    setEditingModule({
      id: module.id,
      title: module.title,
      description: module.description,
    });
  };

  const cancelEditing = () => {
    setEditingModule(null);
  };

  const saveModuleChanges = () => {
    if (editingModule) {
      updateModule(
        editingModule.id,
        editingModule.title,
        editingModule.description
      );
    }
  };

  const fetchQuiz = async (moduleId: string) => {
    if (!course?.id || !userLoginToken) return null;

    try {
      setLoadingQuiz(moduleId);

      // First get the quiz ID for the module
      const quizResponse = await api.getQuiz(
        course.id,
        moduleId,
        userLoginToken
      );

      if (!quizResponse?.data?.[0]?.id) {
        showAlert("error" as AlertType, "No quiz found for this module.");
        return null;
      }

      const quizId = quizResponse.data[0].id;

      // Then get the full quiz data using the quiz ID
      const quizData = await api.getQuizById(
        course.id,
        moduleId,
        quizId,
        userLoginToken
      );

      if (!quizData) {
        showAlert("error" as AlertType, "Failed to load quiz data.");
        return null;
      }

      return quizData;
    } catch (error) {
      console.error("Error fetching quiz:", error);
      showAlert(
        "error" as AlertType,
        "Failed to load quiz data. Please try again."
      );
      return null;
    } finally {
      setLoadingQuiz(null);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const measureTab = (tab: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    tabPositions.current[tab] = { x, width };

    if (tab === activeTab) {
      setIndicatorWidth(width);
      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start();
    }
  };

  useEffect(() => {
    if (tabPositions.current[activeTab]) {
      const { x, width } = tabPositions.current[activeTab];
      setIndicatorWidth(width);
      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start();

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: Math.max(0, x - width),
          animated: true,
        });
      }
    }
  }, [activeTab, indicatorAnim]);

  const renderTabContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#4169E1"
          style={styles.loadingIndicator}
        />
      );
    }

    if (!courseDetails) return null;

    switch (activeTab) {
      case "Overview":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.courseTitle}>{courseDetails.name}</Text>
            <Text style={styles.courseDescription}>
              {courseDetails.description}
            </Text>
            <View style={styles.instructorContainer}>
              {courseDetails.instructor && (
                <View style={styles.instructorImage}>
                  <Users size={24} color="#666666" />
                </View>
              )}
              <Text style={styles.instructorName}>
                {courseDetails.instructor?.fullname || "Unknown Instructor"}
              </Text>
            </View>
            <Text style={styles.price}>
              Price: ₦{courseDetails.price}{" "}
              {courseDetails.discount &&
                courseDetails.discount !== "0" &&
                `(Discount: ${courseDetails.discount}%)`}
            </Text>
            <Text style={styles.rating}>
              Rating:{" "}
              {courseDetails.average_rating ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Star size={16} color="#FFD700" />
                  <Text> {courseDetails.average_rating}</Text>
                </View>
              ) : (
                "Not rated yet"
              )}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {courseDetails.category.map((cat, index) => (
                <View key={index} style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      case "Curriculum":
        return (
          <ScrollView style={styles.tabContent}>
            {courseDetails?.modules.map((module) => (
              <View key={module.id} style={styles.moduleContainer}>
                <View style={styles.moduleHeader}>
                  {editingModule?.id === module.id ? (
                    <View style={styles.moduleEditForm}>
                      <TextInput
                        style={styles.moduleEditInput}
                        value={editingModule.title}
                        onChangeText={(text) =>
                          setEditingModule((prev) =>
                            prev ? { ...prev, title: text } : null
                          )
                        }
                        placeholder="Module Title"
                      />
                      <TextInput
                        style={[
                          styles.moduleEditInput,
                          styles.moduleEditTextArea,
                        ]}
                        value={editingModule.description}
                        onChangeText={(text) =>
                          setEditingModule((prev) =>
                            prev ? { ...prev, description: text } : null
                          )
                        }
                        placeholder="Module Description"
                        multiline
                        numberOfLines={3}
                      />
                      <View style={styles.moduleEditActions}>
                        <TouchableOpacity
                          style={[styles.moduleEditButton, styles.cancelButton]}
                          onPress={cancelEditing}
                          disabled={isEditing}
                        >
                          <X size={16} color="#666666" />
                          <Text style={styles.moduleEditButtonText}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.moduleEditButton, styles.saveButton]}
                          onPress={saveModuleChanges}
                          disabled={isEditing}
                        >
                          {isEditing ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <>
                              <Save size={16} color="#FFFFFF" />
                              <Text style={styles.moduleEditButtonText}>
                                Save
                              </Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                      {moduleCompletionStatus[module.id] && (
                        <View style={styles.completedBadge}>
                          <CheckCircle size={16} color="#FFFFFF" />
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
                {editingModule?.id !== module.id && (
                  <Text style={styles.moduleDescription}>
                    {module.description}
                  </Text>
                )}
                { module.lessons &&
                  module.lessons.map((lesson) => (
                    <TouchableOpacity
                      key={lesson.id}
                      style={[
                        styles.lessonItem,
                        isLessonCompleted(lesson.id) &&
                          styles.completedLessonItem,
                      ]}
                       onPress={() => {
                        const lessonParam = encodeURIComponent(
                          JSON.stringify(lesson)
                        );
                        router.push({
                          pathname: "/students/lesson-video",
                          params: {
                            lesson: lessonParam,
                            moduleId: module.id,
                            courseId: course?.id,
                          },
                        });
                      }}
                    >
                      <Text style={styles.lessonTitle}>
                        {lesson.title} ({lesson.duration || "0"} min)
                      </Text>
                      {isLessonCompleted(lesson.id) && (
                        <View style={styles.lessonCompletedIcon}>
                          <CheckCircle size={16} color="#FFFFFF" />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                {moduleQuizzes &&
                  moduleQuizzes.length > 0 &&
                  renderQuizButton(module)}
              </View>
            ))}
          </ScrollView>
        );
      case "Reviews":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.placeholderText}>
              Reviews will be shown here.
            </Text>
          </View>
        );
      case "Quizzes":
        return (
          <ScrollView style={styles.tabContent}>
            {courseDetails.modules.map((module) => {
              const isCompleted = quizCompletionStatus[module.id];
              return (
                <View key={module.id} style={styles.quizCard}>
                  <View style={styles.quizCardHeader}>
                    <Text style={styles.quizCardTitle}>{module.title}</Text>
                    {isCompleted && (
                      <View style={styles.quizCompletedBadge}>
                        <CheckCircle size={16} color="#FFFFFF" />
                        <Text style={styles.quizCompletedText}>Completed</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.quizCardDescription}>
                    {module.description}
                  </Text>
                  <QuizButton
                    module={module}
                    course={course}
                    userLoginToken={userLoginToken}
                    quizCompletionStatus={quizCompletionStatus}
                  />
                </View>
              );
            })}
          </ScrollView>
        );
      case "Info":
        return (
          <View style={styles.tabContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Calendar size={16} color="#666666" style={{ marginRight: 8 }} />
              <Text style={styles.infoText}>
                Created:{" "}
                {new Date(courseDetails.created_at).toLocaleDateString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Calendar size={16} color="#666666" style={{ marginRight: 8 }} />
              <Text style={styles.infoText}>
                Updated:{" "}
                {new Date(courseDetails.updated_at).toLocaleDateString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <CheckCircle
                size={16}
                color="#666666"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.infoText}>
                Enrolled: {courseDetails.enrolled ? "Yes" : "No"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Users size={16} color="#666666" style={{ marginRight: 8 }} />
              <Text style={styles.infoText}>
                Total Students:{" "}
                {courseDetails.students ? courseDetails.students.length : 0}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  // Update the renderQuizButton function to pass quizCompletionStatus
  const renderQuizButton = (module: Module) => {
    return (
      <QuizButton
        module={module}
        course={course}
        userLoginToken={userLoginToken}
        quizCompletionStatus={quizCompletionStatus}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#4169E1" />
      </TouchableOpacity>

      {/* Header image */}
      <View style={styles.headerContainer}>
        {courseDetails && courseDetails.image_link ? (
          <Image
            source={{ uri: courseDetails.image_link }}
            style={styles.courseImage}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Course Image</Text>
          </View>
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
              onLayout={(event) => measureTab(tab, event)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                transform: [{ translateX: indicatorAnim }],
              },
            ]}
          />
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  } as ViewStyle,
  backButton: {
    padding: 16,
  } as ViewStyle,
  headerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
  } as ViewStyle,
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  } as ImageStyle,
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  } as ViewStyle,
  imagePlaceholderText: {
    fontSize: 16,
    color: "#666",
  } as TextStyle,
  tabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  } as ViewStyle,
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  } as ViewStyle,
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  } as ViewStyle,
  tabText: {
    fontSize: 16,
    color: "#666",
  } as TextStyle,
  activeTabText: {
    color: "#4169E1",
    fontWeight: "600",
  } as TextStyle,
  indicator: {
    height: 2,
    backgroundColor: "#4169E1",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
  contentContainer: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
  tabContent: {
    flex: 1,
  } as ViewStyle,
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  } as TextStyle,
  courseDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  } as TextStyle,
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  } as ViewStyle,
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  } as ViewStyle,
  instructorName: {
    fontSize: 16,
    fontWeight: "500",
  } as TextStyle,
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  } as TextStyle,
  rating: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  } as TextStyle,
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  } as ViewStyle,
  categoryBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  } as ViewStyle,
  categoryText: {
    fontSize: 14,
    color: "#666",
  } as TextStyle,
  moduleContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  } as ViewStyle,
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  } as TextStyle,
  moduleDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  } as TextStyle,
  completedBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  } as ViewStyle,
  completedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  } as TextStyle,
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  } as ViewStyle,
  completedLessonItem: {
    backgroundColor: "#e8f5e9",
  } as ViewStyle,
  lessonTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  } as TextStyle,
  lessonCompletedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  lessonCompletedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  } as TextStyle,
  quizButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  } as ViewStyle,
  quizButtonCompleted: {
    backgroundColor: "#4CAF50",
  } as ViewStyle,
  quizButtonLoader: {
    alignSelf: "center",
  } as ViewStyle,
  quizButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  quizButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  } as TextStyle,
  quizButtonSubtext: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  } as TextStyle,
  quizButtonIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  } as ViewStyle,
  quizButtonArrow: {
    width: 20,
    height: 20,
    marginLeft: 8,
  } as ViewStyle,
  loadingIndicator: {
    marginTop: 20,
  } as ViewStyle,
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  } as TextStyle,
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  } as TextStyle,
  moduleEditForm: {
    width: "100%",
    marginBottom: 10,
  } as ViewStyle,
  moduleEditInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  } as TextStyle,
  moduleEditTextArea: {
    height: 80,
    textAlignVertical: "top",
  } as TextStyle,
  moduleEditActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  } as ViewStyle,
  moduleEditButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  } as ViewStyle,
  cancelButton: {
    backgroundColor: "#f0f0f0",
  } as ViewStyle,
  saveButton: {
    backgroundColor: "#4169E1",
  } as ViewStyle,
  moduleEditButtonText: {
    color: "#fff",
    fontWeight: "bold",
  } as TextStyle,
  editModuleButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  } as ViewStyle,
  editModuleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  } as TextStyle,
  quizCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  quizCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  } as ViewStyle,
  quizCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  } as TextStyle,
  quizCardDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
  } as TextStyle,
  quizCompletedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  } as ViewStyle,
  quizCompletedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  } as TextStyle,
});
