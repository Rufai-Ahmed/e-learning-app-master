"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";

interface Option {
  value: string;
  id: string;
  answer: boolean;
}

interface Question {
  question: string;
  quiz_id: string;
  id: string;
  options: Option[];
}

interface Quiz {
  module_id: string;
  questions: Question[];
  id: string;
  passing_score?: number; // Optional passing score
}

interface QuizCallback {
  type: "markQuizCompleted";
  moduleId: string;
}

interface RootState {
  user: {
    userLoginToken: string;
  };
}

export default function QuizScreen() {
  const params = useLocalSearchParams();
  const quiz = params.quiz
    ? (JSON.parse(decodeURIComponent(params.quiz as string)) as Quiz)
    : null;
  const moduleId = params.moduleId as string;
  const courseId = params.courseId as string;
  const callback = params.onQuizComplete
    ? (JSON.parse(
        decodeURIComponent(params.onQuizComplete as string)
      ) as QuizCallback)
    : null;

  const token = useAppSelector((state: RootState) => state.user.userLoginToken);

  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (quiz) {
      setLoading(false);
    }
  }, [quiz]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      setLoading(true);
      // Format answers in the correct structure
      const answers = Object.entries(selectedOptions).map(
        ([questionId, optionId]) => ({
          question_id: questionId,
          option_id: optionId,
        })
      );

      // Submit quiz answers
      const res = await api.submitQuiz(
        courseId,
        moduleId,
        quiz?.id || "",
        answers,
        token
      );

      if (!res?.data) {
        throw new Error("No response data received");
      }

      // Calculate score percentage
      const correctAnswers = parseInt(res.data.score);
      const totalQuestions = res.data.total_no_of_questions;
      const scorePercentage = (correctAnswers / totalQuestions) * 100;

      setScore(correctAnswers);
      setPassed(scorePercentage >= 70);

      // If quiz is passed and we have a callback, post a message to mark it as completed
      if (scorePercentage >= 70 && callback?.type === "markQuizCompleted") {
        await router.setParams({
          action: "markQuizCompleted", 
          moduleId: callback.moduleId,
        });
      }

      // Show results
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4169E1" />
          <Text style={styles.loadingText}>Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4169E1" />
            <Text style={styles.loadingText}>Submitting quiz...</Text>
          </View>
        ) : !showResults ? (
          <View style={styles.questionContainer}>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedOptions[currentQuestion.id] === option.id &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    handleOptionSelect(currentQuestion.id, option.id)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions[currentQuestion.id] === option.id &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              disabled={!selectedOptions[currentQuestion.id]}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < quiz.questions.length - 1
                  ? "Next Question"
                  : loading
                  ? "Submitting..."
                  : "Finish Quiz"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Quiz Completed!</Text>
            <Text style={styles.resultsText}>
              You've answered {Object.keys(selectedOptions).length} out of{" "}
              {quiz.questions.length} questions.
            </Text>
            <Text style={styles.scoreText}>
              Score: {score} / {quiz.questions.length} (
              {((score / quiz.questions.length) * 100).toFixed(0)}%)
            </Text>
            <Text
              style={[
                styles.passFailText,
                passed ? styles.passedText : styles.failedText,
              ]}
            >
              {passed ? "Passed!" : "Not Passed"}
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => router.back()}
            >
              <Text style={styles.submitButtonText}>Return to Course</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 16,
  },
  questionCounter: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eaeaea",
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: "#4169E1",
    borderColor: "#4169E1",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsContainer: {
    padding: 16,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  passFailText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  passedText: {
    color: "#4CAF50",
  },
  failedText: {
    color: "#F44336",
  },
});
