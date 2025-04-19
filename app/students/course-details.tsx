import { CourseHeader } from "@/components/ui/CourseDetailHeader";
import { Curriculum } from "@/components/ui/CourseDetailsCurriculum";
import { InstructorProfile } from "@/components/ui/CourseDetailsInstructor";
import { LearningOutcomes } from "@/components/ui/CourseDetailsLearningOutcome";
import { RatingsSection } from "@/components/ui/CourseDetailsRatings";
import { CourseCertificate } from "@/components/ui/CourseCertificate";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { Award } from "lucide-react-native";
import React from "react";
import { Course, Module } from "@/lib/interfaces/course";

export default function App() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [moduleCompletionStatus, setModuleCompletionStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const { showAlert } = useAlert();
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const userId = useAppSelector((state) => state.user.user?.id);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      console.log({courseId}, );
      if (courseId) {
        const response = await api.getCoursesById(courseId, userToken);
        setCourse(response?.data);

        // Fetch module completion status
        if (response?.data?.modules) {
          await fetchModuleCompletionStatus(response.data.modules);
        }
      }
    } catch (error: any) {
      console.error("Error fetching course:", error?.response?.data);
      showAlert("error", "Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch module completion status
  const fetchModuleCompletionStatus = async (modules: Module[]) => {
    if (!userId || !courseId) return;

    try {
      const completionStatus: { [key: string]: boolean } = {};

      // For each module, check if it's completed
      for (const module of modules) {
        try {
          // Assuming there's an API endpoint to check module completion
          const response = await api.getLearningObjectives(courseId, userToken);

          // Check if this module is in the completed modules list
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

  // Check if all modules are completed
  const isCourseCompleted = course?.modules?.every(
    (module: Module) => moduleCompletionStatus[module.id]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <CourseHeader />
        <LearningOutcomes />
        {/*  <CourseFeatures />*/}
        <Curriculum />
        <InstructorProfile />
        <RatingsSection />
        {/* <RecommendedCourses/>*/}

        {isCourseCompleted && (
          <View style={styles.certificateSection}>
            <View style={styles.certificateHeader}>
              <Award size={24} color="#4169E1" />
              <Text style={styles.certificateTitle}>Course Completed!</Text>
            </View>
            <Text style={styles.certificateDescription}>
              Congratulations! You have successfully completed this course. You
              can now view your certificate.
            </Text>
            <TouchableOpacity
              style={styles.viewCertificateButton}
              onPress={() => setShowCertificate(true)}
            >
              <Text style={styles.viewCertificateText}>View Certificate</Text>
            </TouchableOpacity>
          </View>
        )}

        {showCertificate && courseId && (
          <CourseCertificate courseId={courseId} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  certificateSection: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  certificateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  certificateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4169E1",
    marginLeft: 10,
  },
  certificateDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    lineHeight: 24,
  },
  viewCertificateButton: {
    backgroundColor: "#4169E1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  viewCertificateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
