import { CourseHeader } from "@/components/ui/CourseDetailHeader"
import { Curriculum } from "@/components/ui/CourseDetailsCurriculum"
import { CourseFeatures } from "@/components/ui/CourseDetailsFeatures"
import { InstructorProfile } from "@/components/ui/CourseDetailsInstructor"
import { LearningOutcomes } from "@/components/ui/CourseDetailsLearningOutcome"
import { RatingsSection } from "@/components/ui/CourseDetailsRatings"
import { RecommendedCourses } from "@/components/ui/CourseDetailsRecommended"
import { ScrollView, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppSelector } from '@/hooks/useAppSelector';
import { api } from '@/lib/actions/api';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCategories, getCourseDetails, getCourses } from '@/lib/reducers/storeUserCourses';
import { useAlert } from "@/hooks/useAlert";


export default function App() {
  

  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <CourseHeader />
        <LearningOutcomes />
      {/*  <CourseFeatures />*/}
        <Curriculum />
        <InstructorProfile/>
        <RatingsSection/>
       {/* <RecommendedCourses/>*/}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
})

