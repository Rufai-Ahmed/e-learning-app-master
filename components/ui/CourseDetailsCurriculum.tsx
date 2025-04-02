import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";

export const Curriculum = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [modules, setModules] = useState([]);
  const token = useAppSelector((state) => state.user.userLoginToken);
  const courseDetails = useAppSelector((state) => state.courses.courseDetails);

  useEffect(() => {
    fetchCourseModules();
  }, [courseDetails]);

  const fetchCourseModules = async () => {
    try {
      const res = await api.getLearningObjectives(courseDetails?.id, token);
      console.log(res?.data);
      setModules(res?.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Course Content</Text>
        <Text style={styles.subtitle}>Modules</Text>
      </View>

      {modules?.length > 0 ? (
        modules.map((module, index) => (
          <View key={module.id} style={styles.weekContainer}>
            <TouchableOpacity
              style={styles.weekHeader}
              onPress={() =>
                setExpandedModule(expandedModule === index ? null : index)
              }
            >
              <View style={styles.weekTitle}>
                <Ionicons
                  name={
                    expandedModule === index
                      ? "chevron-down"
                      : "chevron-forward"
                  }
                  size={24}
                  color="#4169E1"
                />
                <Text style={styles.weekTitleText}>{module.title}</Text>
              </View>
            </TouchableOpacity>

            {expandedModule === index && (
              <View style={styles.lecturesList}>
                <Text style={styles.noContent}>{module.description}.</Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noContent}>No modules available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
  },
  weekContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  weekTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  weekTitleText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  lecturesList: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  noContent: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
});

export default Curriculum;
