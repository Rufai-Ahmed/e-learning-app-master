import { CourseHeader } from "@/components/ui/CourseDetailHeader";
import { Curriculum } from "@/components/ui/CourseDetailsCurriculum";
import { InstructorProfile } from "@/components/ui/CourseDetailsInstructor";
import { LearningOutcomes } from "@/components/ui/CourseDetailsLearningOutcome";
import { RatingsSection } from "@/components/ui/CourseDetailsRatings";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
