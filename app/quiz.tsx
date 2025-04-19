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

interface Option {
  value: string;
  id: string;
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
}

export default function QuizScreen() {
  const params = useLocalSearchParams();
  const quiz = params.quiz
    ? (JSON.parse(decodeURIComponent(params.quiz as string)) as Quiz)
    : null;
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);

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
      setShowResults(true);
    }
  };

  const handleSubmitQuiz = () => {
    // Here you would typically submit the quiz answers to your backend
    console.log("Quiz answers:", selectedOptions);
    // For now, just show a success message and go back
    alert("Quiz submitted successfully!");
    router.back();
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
        {!showResults ? (
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
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitQuiz}
            >
              <Text style={styles.submitButtonText}>Submit Quiz</Text>
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
});
