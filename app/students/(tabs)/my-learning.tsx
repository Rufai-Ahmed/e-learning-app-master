import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { api } from "@/lib/actions/api";
import { Course } from "@/lib/interfaces/course";
import { getCourseDetails } from "@/lib/reducers/storeUserCourses";
import { useFocusEffect, useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LearnScreen = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const { showAlert } = useAlert();
  const userData = useAppSelector((state) => state.user.user);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  useFocusEffect(
    useCallback(() => {
      const fetchCourses = async () => {
        setLoading(true);
        try {
          const response = await api.getUserCourses(userData?.id, userToken);
          setCourses(response?.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
          showAlert("error", "Failed to load courses. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();

    }, [userData?.id, userToken, showAlert])
  );
  
  
  const handleExploreCourses = () => {
    router.push("/students/search");
  };

  const navigateToCourseDetails = (item: Course) => {
    dispatch(getCourseDetails(item));
    router.push("/students/course-learning-details");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Learning</Text>
        <TouchableOpacity>
          <Settings size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#4169E1" />
        ) : courses?.length === 0 ? (
          <View style={styles.noCoursesContainer}>
            <Text style={styles.noCoursesText}>No courses found.</Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={handleExploreCourses}
            >
              <Text style={styles.exploreButtonText}>Explore Courses</Text>
            </TouchableOpacity>
          </View>
        ) : (
          courses.map((item) => (
            <TouchableOpacity
              onPress={() => navigateToCourseDetails(item)}
              key={item.id}
              style={styles.courseCard}
            >
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseAuthor}>
                {item.instructor?.fullname || "Unknown Instructor"}
              </Text>
              <Text style={styles.coursePrice}>₦{item.price}</Text>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {item.completionStatus === "completed"
                    ? "Completed"
                    : "In Progress"}
                </Text>
                <Text style={styles.progressText}>
                  {item.percentComplete}% Complete
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  content: {
    flex: 1,
    padding: 10,
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    padding: 15,
    marginBottom: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  courseAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4169E1",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  noCoursesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noCoursesText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: "#4169E1",
    padding: 10,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default LearnScreen;
