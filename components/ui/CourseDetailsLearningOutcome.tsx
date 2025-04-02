import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";

export const LearningOutcomes = () => {
  const [outComes, setOutComes] = useState([]);
  const token = useAppSelector((state) => state.user.userLoginToken);
  const courseDetails = useAppSelector((state) => state.courses.courseDetails);

  useEffect(() => {
    fetchLearningOutcomes();
  }, []);

  const fetchLearningOutcomes = async () => {
    try {
      const res = await api.getLearningObjectives(courseDetails?.id, token);
      const modules = res?.data || [];

      console.log(modules, "modules");
      // Extract lessons from modules
      const lessons = modules
        .map((module) => module.lessons)
        .filter((lesson) => Array.isArray(lesson)) // Ensure it's an array
        .flat(); // Flatten in case lessons are nested

      setOutComes(lessons?.length > 0 ? lessons : ["No lessons available"]);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What you'll learn</Text>
      <View style={styles.list}>
        {outComes?.map((outcome, index) => (
          <View key={index} style={styles.item}>
            <Ionicons name="checkmark" size={24} color="#4169E1" />
            <Text style={styles.itemText}>{outcome}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  itemText: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
  },
});
