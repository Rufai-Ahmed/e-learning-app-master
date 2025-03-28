"use client";

import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const quizzes = [
  {
    id: "1.1",
    weight: "25%",
    status: "The course has ended. Assignments may not be resubmitted.",
  },
  {
    id: "1.2",
    weight: "25%",
    status: "The course has ended. Assignments may not be resubmitted.",
  },
  {
    id: "2.1",
    weight: "16.67%",
    status: "The course has ended. Assignments may not be resubmitted.",
  },
  {
    id: "2.2",
    weight: "16.67%",
    status: "The course has ended. Assignments may not be resubmitted.",
  },
  {
    id: "2.3",
    weight: "16.67%",
    status: "The course has ended. Assignments may not be resubmitted.",
  },
];

export default function QuizScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.checkmark}>
          <Icon name="check" size={24} color="#4169E1" />
        </View>
        <Text style={styles.headerText}>
          The course has ended. Your score is 0%. Final grades will be reported
          on the university's grading system.
        </Text>
      </View>

      {quizzes.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          style={styles.quizItem}
          onPress={() =>
            navigation.navigate("QuizQuestion", { quizId: quiz.id })
          }
        >
          <View style={styles.quizHeader}>
            <Icon name="lock" size={20} color="#000000" />
            <Text style={styles.quizId}>{quiz.id}</Text>
          </View>
          <Text style={styles.quizTitle}>Graded Assignment</Text>
          <Text style={styles.quizWeight}>Weight: {quiz.weight}</Text>
          <Text style={styles.quizStatus}>{quiz.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
  },
  checkmark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
  },
  quizItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quizId: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#000000",
  },
  quizTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  quizWeight: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  quizStatus: {
    fontSize: 14,
    color: "#666666",
  },
});
