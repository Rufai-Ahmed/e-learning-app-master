import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Video,
  Edit2,
  Trash2,
  FileText,
} from "lucide-react-native";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { router, useLocalSearchParams } from "expo-router";
import type {
  Course,
  Category,
  Module,
  Lesson,
  Quiz,
  Question,
  Option,
} from "@/lib/interfaces/course";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { convertUriToBlob } from "@/utils/generic";

export default function EditCourseScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showAlert } = useAlert();
  const userToken = useAppSelector((state) => state.user.userLoginToken);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [imageLink, setImageLink] = useState("");
  const [discount, setDiscount] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [isAddModuleModalVisible, setIsAddModuleModalVisible] = useState(false);
  const [isAddLessonModalVisible, setIsAddLessonModalVisible] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("");
  const [newLessonVideo, setNewLessonVideo] = useState<{
    uri: string;
    name: string;
  } | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Quiz related state
  const [isAddQuizModalVisible, setIsAddQuizModalVisible] = useState(false);
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState<
    string | null
  >(null);
  const [currentQuiz, setCurrentQuiz] = useState<Partial<Quiz>>({
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    options: [],
  });
  const [currentOption, setCurrentOption] = useState<Partial<Option>>({
    value: "",
    answer: false,
  });

  // New state for lesson editing
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isEditLessonModalVisible, setIsEditLessonModalVisible] =
    useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getCoursesById(courseId, userToken);
      const courseData = response?.data;
      setCourse(courseData);

      // Initialize form state
      setName(courseData.name);
      setDescription(courseData.description);
      setPrice(courseData.price);
      setCategoryNames(courseData.category.map((cat: Category) => cat.name));
      setImageLink(courseData.image_link);
      setDiscount(courseData.discount);
      setModules(courseData.modules || []);
    } catch (error: any) {
      console.error("Error fetching course:", error?.response?.data);
      showAlert("error", "Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const blob = await convertUriToBlob(imageUri);
        const formData = new FormData();
        formData.append("image", blob);

        setLoading(true);
        const response = await api.uploadCourseImage(
          courseId,
          userToken,
          formData
        );
        setImageLink(response?.data?.image_link);
        showAlert("success", "Image uploaded successfully");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error?.response?.data);
      showAlert("error", "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setNewLessonVideo({
          uri: result.assets[0].uri,
          name: result.assets[0].name,
        });
      }
    } catch (error) {
      console.error("Error picking video:", error);
      showAlert("error", "Failed to pick video");
    }
  };

  const handleAddModule = async () => {
    if (!newModuleTitle.trim()) {
      showAlert("error", "Module title is required");
      return;
    }

    try {
      setLoading(true);
      const moduleData = {
        title: newModuleTitle,
        description: newModuleDescription,
      };

      await api.createLearningObjectives(courseId, moduleData, userToken);
      showAlert("success", "Module added successfully");
      setIsAddModuleModalVisible(false);
      setNewModuleTitle("");
      setNewModuleDescription("");
      fetchCourseDetails(); // Refresh course details instead of modules
    } catch (error: any) {
      console.error("Error adding module:", error?.response?.data);
      showAlert("error", "Failed to add module");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async () => {
    if (!selectedModuleId || !newLessonTitle.trim()) {
      showAlert("error", "Lesson title is required");
      return;
    }

    try {
      setLoading(true);
      const lessonData = {
        title: newLessonTitle,
        description: newLessonDescription,
        duration: newLessonDuration || "0",
      };

      // Create the lesson first
      const module = (modules || []).find((m) => m.id === selectedModuleId);
      if (!module) {
        showAlert("error", "Module not found");
        return;
      }

      // Add lesson to module with only required fields
      const updatedModule = {
        ...module,
        lessons: [
          ...(module?.lessons || []),
          lessonData, // Only include the required fields
        ],
      };

      // Update the module with the new lesson
      await api.addLesson(courseId, selectedModuleId, lessonData, userToken);

      // If there's a video, upload it
      if (newLessonVideo) {
        setUploadingVideo(true);
        const formData = new FormData();
        const blob = await convertUriToBlob(newLessonVideo.uri);
        formData.append("video", blob);

        // Get the newly created lesson ID from course details
        const courseResponse = await api.getCoursesById(courseId, userToken);
        const updatedModule = courseResponse?.data?.modules?.find(
          (m: Module) => m.id === selectedModuleId
        );
        const newLesson = updatedModule?.lessons?.find(
          (l: Lesson) => l.title === newLessonTitle
        );

        if (newLesson) {
          await api.uploadCourseVideo(
            newLesson.id,
            userToken,
            courseId,
            selectedModuleId,
            formData
          );
        }
        setUploadingVideo(false);
      }

      showAlert("success", "Lesson added successfully");
      setIsAddLessonModalVisible(false);
      setNewLessonTitle("");
      setNewLessonDescription("");
      setNewLessonDuration("");
      setNewLessonVideo(null);
      fetchCourseDetails(); // Refresh course details instead of modules
    } catch (error: any) {
      console.error("Error adding lesson:", { error });
      showAlert("error", "Failed to add lesson");
      setUploadingVideo(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!course) return;

    try {
      setSaving(true);
      const updatedCourse = {
        name,
        description,
        price,
        category: categoryNames, // Send as array of strings
        image_link: imageLink,
        discount,
      };

      await api.updateCourse(course.id, updatedCourse, userToken);
      showAlert("success", "Course updated successfully");
      router.back();
    } catch (error: any) {
      console.error("Error updating course:", error?.response?.data);
      showAlert("error", "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    Alert.prompt(
      "Add Category",
      "Enter category name",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: (categoryName) => {
            if (categoryName && categoryName.trim()) {
              setCategoryNames([...categoryNames, categoryName.trim()]);
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...categoryNames];
    updatedCategories.splice(index, 1);
    setCategoryNames(updatedCategories);
  };

  // Quiz related handlers
  const handleAddQuiz = () => {
    if (!selectedModuleForQuiz) {
      showAlert("error", "Please select a module first");
      return;
    }
    setIsAddQuizModalVisible(true);
  };

  const handleAddQuestion = () => {
    if (!currentQuestion?.question?.trim()) {
      showAlert("error", "Question text is required");
      return;
    }
    if (currentQuestion!.options?.length! < 2) {
      showAlert("error", "At least 2 options are required");
      return;
    }
    if (!currentQuestion!.options?.some((opt) => opt.answer)) {
      showAlert("error", "Please mark at least one option as correct");
      return;
    }

    setCurrentQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
    }));
    setCurrentQuestion({
      question: "",
      options: [],
    });
  };

  const handleAddOption = () => {
    if (!currentOption.value.trim()) {
      showAlert("error", "Option text is required");
      return;
    }
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, currentOption],
    }));
    setCurrentOption({
      value: "",
      answer: false,
    });
  };

  const handleRemoveOption = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSetCorrectAnswer = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => ({
        ...opt,
        answer: i === index,
      })),
    }));
  };

  const handleSaveQuiz = async () => {
    if (!selectedModuleForQuiz) return;
    if (currentQuiz.questions.length === 0) {
      showAlert("error", "At least one question is required");
      return;
    }

    try {
      setLoading(true);
      const quizData = {
        questions: currentQuiz.questions.map((q) => ({
          question: q.question,
          options: q.options.map((o) => ({
            value: o.value,
            answer: o.answer,
          })),
        })),
      };

      await api.createQuiz(
        courseId,
        selectedModuleForQuiz,
        quizData,
        userToken
      );
      showAlert("success", "Quiz added successfully");
      setIsAddQuizModalVisible(false);
      setCurrentQuiz({
        questions: [],
      });
      fetchCourseDetails();
    } catch (error: any) {
      console.error("Error adding quiz:", error?.response?.data);
      showAlert("error", "Failed to add quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = async () => {
    if (!editingLesson || !selectedModuleId) {
      showAlert("error", "Lesson data is missing");
      return;
    }

    try {
      setLoading(true);
      const module = (modules || []).find((m) => m.id === selectedModuleId);
      if (!module) {
        showAlert("error", "Module not found");
        return;
      }

      // Update the module with the edited lesson
      await api.updateLesson(
        courseId,
        selectedModuleId,
        editingLesson.id,
        editingLesson,
        userToken
      );

      // Refresh course details
      await fetchCourseDetails();
      setIsEditLessonModalVisible(false);
      setEditingLesson(null);
      showAlert("success", "Lesson updated successfully");
    } catch (error: any) {
      console.error("Error updating lesson:", error?.response?.data);
      showAlert("error", "Failed to update lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    try {
      setLoading(true);
      const module = (modules || []).find((m) => m.id === moduleId);
      if (!module) {
        showAlert("error", "Module not found");
        return;
      }

      // Remove the lesson from the module
      const updatedModule = {
        ...module,
        lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
      };

      // Update the module without the deleted lesson
      await api.saveCourseEdit(courseId, updatedModule, userToken);

      // Refresh course details
      await fetchCourseDetails();
      showAlert("success", "Lesson deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson:", error?.response?.data);
      showAlert("error", "Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Course</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Course Image</Text>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imageContainer}
          >
            {imageLink ? (
              <Image source={{ uri: imageLink }} style={styles.courseImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>Tap to add image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Course Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter course name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter course description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter course price"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Discount</Text>
          <TextInput
            style={styles.input}
            value={discount}
            onChangeText={setDiscount}
            placeholder="Enter discount percentage"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Categories</Text>
            <TouchableOpacity
              onPress={handleAddCategory}
              style={styles.addButton}
            >
              <Plus size={20} color="#4169E1" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            {categoryNames.map((cat, index) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{cat}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveCategory(index)}
                  style={styles.removeCategoryButton}
                >
                  <X size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Modules & Lessons</Text>
            <TouchableOpacity
              onPress={() => setIsAddModuleModalVisible(true)}
              style={styles.addButton}
            >
              <Plus size={20} color="#4169E1" />
            </TouchableOpacity>
          </View>

          {modules.map((module) => (
            <View key={module.id} style={styles.moduleContainer}>
              <TouchableOpacity
                style={styles.moduleHeader}
                onPress={() =>
                  setExpandedModule(
                    expandedModule === module.id ? null : module.id
                  )
                }
              >
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <View style={styles.moduleActions}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedModuleId(module.id);
                      setIsAddLessonModalVisible(true);
                    }}
                    style={styles.moduleActionButton}
                  >
                    <Plus size={16} color="#4169E1" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedModuleForQuiz(module.id);
                      setIsAddQuizModalVisible(true);
                    }}
                    style={styles.moduleActionButton}
                  >
                    <FileText size={16} color="#4169E1" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {expandedModule === module.id && (
                <View style={styles.lessonsContainer}>
                  {(module?.lessons || []).map((lesson) => (
                    <View key={lesson.id} style={styles.lessonItem}>
                      <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                        <Text style={styles.lessonDuration}>
                          {lesson.duration} minutes
                        </Text>
                      </View>
                      <View style={styles.lessonActions}>
                        <TouchableOpacity
                          style={styles.lessonActionButton}
                          onPress={() => {
                            setEditingLesson(lesson);
                            setSelectedModuleId(module.id);
                            setIsEditLessonModalVisible(true);
                          }}
                        >
                          <Edit2 size={16} color="#4169E1" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.lessonActionButton}
                          onPress={() =>
                            handleDeleteLesson(module.id, lesson.id)
                          }
                        >
                          <Trash2 size={16} color="#FF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  {/* Quiz Section */}
                  {module.quiz && module.quiz.length > 0 && (
                    <View style={styles.quizContainer}>
                      <Text style={styles.quizTitle}>Quizzes</Text>
                      {module.quiz.map((quiz) => (
                        <View key={quiz.id} style={styles.questionContainer}>
                          {quiz.questions.map((question) => (
                            <View key={question.id}>
                              <Text style={styles.questionText}>
                                {question.question}
                              </Text>
                              {question.options.map((option) => (
                                <View
                                  key={option.id}
                                  style={styles.optionContainer}
                                >
                                  <Text
                                    style={[
                                      styles.optionText,
                                      option.answer && styles.correctOption,
                                    ]}
                                  >
                                    {option.value}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Module Modal */}
      <Modal
        visible={isAddModuleModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Module</Text>
              <TouchableOpacity
                onPress={() => setIsAddModuleModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Module Title</Text>
              <TextInput
                style={styles.input}
                value={newModuleTitle}
                onChangeText={setNewModuleTitle}
                placeholder="Enter module title"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newModuleDescription}
                onChangeText={setNewModuleDescription}
                placeholder="Enter module description"
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddModule}
            >
              <Text style={styles.saveButtonText}>Add Module</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal
        visible={isAddLessonModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Lesson</Text>
              <TouchableOpacity
                onPress={() => setIsAddLessonModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Lesson Title</Text>
              <TextInput
                style={styles.input}
                value={newLessonTitle}
                onChangeText={setNewLessonTitle}
                placeholder="Enter lesson title"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newLessonDescription}
                onChangeText={setNewLessonDescription}
                placeholder="Enter lesson description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={newLessonDuration}
                onChangeText={setNewLessonDuration}
                placeholder="Enter lesson duration"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Video</Text>
              <TouchableOpacity
                onPress={handleVideoPick}
                style={styles.videoPickerButton}
              >
                <Video size={20} color="#4169E1" />
                <Text style={styles.videoPickerText}>
                  {newLessonVideo ? newLessonVideo.name : "Select Video"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddLesson}
              disabled={uploadingVideo}
            >
              <Text style={styles.saveButtonText}>
                {uploadingVideo ? "Uploading..." : "Add Lesson"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Quiz Modal */}
      <Modal
        visible={isAddQuizModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Quiz</Text>
              <TouchableOpacity
                onPress={() => setIsAddQuizModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {/* Current Question Section */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Question</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={currentQuestion!.question}
                  onChangeText={(question) =>
                    setCurrentQuestion((prev) => ({ ...prev, question }))
                  }
                  placeholder="Enter your question"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Options Section */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Options</Text>
                {currentQuestion!.options.map((option, index) => (
                  <View key={index} style={styles.optionRow}>
                    <TouchableOpacity
                      style={styles.radioButton}
                      onPress={() => handleSetCorrectAnswer(index)}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          option.answer && styles.radioSelected,
                        ]}
                      >
                        {option.answer && <View style={styles.radioInner} />}
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.optionText}>{option.value}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveOption(index)}
                      style={styles.removeOptionButton}
                    >
                      <X size={16} color="#FF4444" />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Add Option Input */}
                <View style={styles.addOptionContainer}>
                  <TextInput
                    style={[styles.input, styles.optionInput]}
                    value={currentOption.value}
                    onChangeText={(value) =>
                      setCurrentOption((prev) => ({ ...prev, value }))
                    }
                    placeholder="Enter option text"
                  />
                  <TouchableOpacity
                    onPress={handleAddOption}
                    style={styles.addOptionButton}
                  >
                    <Plus size={20} color="#4169E1" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Add Question Button */}
              <TouchableOpacity
                style={[styles.button, styles.addQuestionButton]}
                onPress={handleAddQuestion}
              >
                <Text style={styles.buttonText}>Add Question</Text>
              </TouchableOpacity>

              {/* Questions List */}
              {currentQuiz.questions.length > 0 && (
                <View style={styles.questionsList}>
                  <Text style={styles.label}>Added Questions</Text>
                  {currentQuiz.questions.map((q, qIndex) => (
                    <View key={qIndex} style={styles.questionItem}>
                      <Text style={styles.questionText}>{q.question}</Text>
                      {q.options.map((opt, oIndex) => (
                        <View key={oIndex} style={styles.optionItem}>
                          <Text
                            style={[
                              styles.optionText,
                              opt.answer && styles.correctOption,
                            ]}
                          >
                            {opt.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Save Quiz Button */}
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveQuiz}
              >
                <Text style={styles.buttonText}>Save Quiz</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Edit Lesson Modal */}
      <Modal
        visible={isEditLessonModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Lesson</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsEditLessonModalVisible(false);
                  setEditingLesson(null);
                }}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={editingLesson?.title}
                onChangeText={(text) =>
                  setEditingLesson((prev) =>
                    prev ? { ...prev, title: text } : null
                  )
                }
                placeholder="Enter lesson title"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editingLesson?.description}
                onChangeText={(text) =>
                  setEditingLesson((prev) =>
                    prev ? { ...prev, description: text } : null
                  )
                }
                placeholder="Enter lesson description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={editingLesson?.duration}
                onChangeText={(text) =>
                  setEditingLesson((prev) =>
                    prev ? { ...prev, duration: text } : null
                  )
                }
                placeholder="Enter lesson duration"
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditLesson}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4169E1",
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryTag: {
    backgroundColor: "#4169E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
  },
  removeCategoryButton: {
    marginLeft: 4,
  },
  addButton: {
    padding: 4,
  },
  moduleContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  moduleActions: {
    flexDirection: "row",
  },
  moduleActionButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  lessonsContainer: {
    padding: 12,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  lessonDuration: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  lessonActions: {
    flexDirection: "row",
  },
  lessonActionButton: {
    padding: 4,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  saveButton: {
    backgroundColor: "#4169E1",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  videoPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  videoPickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  quizContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  questionContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  questionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  correctOption: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  modalScroll: {
    maxHeight: "80%",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  radioButton: {
    marginRight: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4169E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: "#4169E1",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4169E1",
  },
  removeOptionButton: {
    padding: 4,
  },
  addOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
  },
  addOptionButton: {
    padding: 8,
    backgroundColor: "#4169E1",
    borderRadius: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addQuestionButton: {
    backgroundColor: "#4169E1",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  questionsList: {
    marginTop: 24,
  },
  questionItem: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  optionItem: {
    marginTop: 4,
    paddingLeft: 24,
  },
});
