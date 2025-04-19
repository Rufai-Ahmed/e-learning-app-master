import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings, Edit2, Trash2 } from "lucide-react-native";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useFocusEffect } from "@react-navigation/native";
import { getInstructorCourses } from "@/lib/reducers/storeInstructorCourses";
import { router } from "expo-router";
import type { Course } from "@/lib/interfaces/course";

export default function ManageCoursesScreen() {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const userData = useAppSelector((state) => state.user.user);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.instructorCourses.courses);

  useFocusEffect(
    useCallback(() => {
      fetchInstructorCourses();
    }, [])
  );

  const fetchInstructorCourses = async () => {
    try {
      setLoading(true);
      const res = await api.getInstructorCourses(userData?.id, userToken);
      dispatch(getInstructorCourses(res?.data));
    } catch (error: any) {
      console.error("Error fetching courses:", error?.response?.data);
      showAlert("error", "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    router.push({
      pathname: "/instructor/edit-course",
      params: { courseId: course.id },
    });
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      Alert.alert(
        "Delete Course",
        "Are you sure you want to delete this course?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                setLoading(true);
                await api.deleteCourse(courseId, userToken);
                showAlert("success", "Course deleted successfully");
                fetchInstructorCourses();
              } catch (error: any) {
                console.error("Error deleting course:", error?.response?.data);
                showAlert("error", "Failed to delete course");
              } finally {
                setLoading(false);
              }
            },
          },
        ]
      );
    } catch (error: any) {
      console.error("Error deleting course:", error?.response?.data);
      showAlert("error", "Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const CourseManagementCard = ({ course }: { course: Course }) => (
    <View style={styles.courseManagementCard}>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>Title: {course.name}</Text>
        <Text style={styles.courseDescription}>
          Description: {course.description}
        </Text>
        <Text style={styles.courseInfo}>Price: ₦{course.price}</Text>
        <Text style={styles.courseInfo}>
          Categories: {course?.category?.map((cat) => cat.name).join(", ")}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditCourse(course)}
        >
          <Edit2 size={20} color="#4169E1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteCourse(course.id)}
        >
          <Trash2 size={20} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Courses</Text>
        <TouchableOpacity>
          <Settings size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {courses?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No courses found</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push("/instructor/(tabs)/add-course")}
            >
              <Text style={styles.createButtonText}>Create Course</Text>
            </TouchableOpacity>
          </View>
        ) : (
          courses?.map((course: Course) => (
            <CourseManagementCard key={course.id} course={course} />
          ))
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
    padding: 16,
  },
  courseManagementCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseContent: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  courseInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
