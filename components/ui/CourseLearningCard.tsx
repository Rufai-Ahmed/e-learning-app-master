import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CheckCircle, Clock } from "lucide-react-native"

interface CourseProps {
  id: number
  title: string
  progress: string
  status: string
  completionStatus: "completed" | "in_progress"
  percentComplete: number
}

interface CourseCardProps {
  course: CourseProps
}

export function CourseCard({ course }: CourseCardProps) {
  const renderStatusIcon = (completionStatus: "completed" | "in_progress") => {
    if (completionStatus === "completed") {
      return <CheckCircle size={20} color="#4CAF50" />
    }
    return <Clock size={20} color="#FFA000" />
  }

  const renderProgressBar = (percentComplete: number) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentComplete}%` }]} />
      </View>
    )
  }

  return (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        {renderStatusIcon(course.completionStatus)}
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseProgress}>{course.progress}</Text>
        <Text style={styles.bullet}> • </Text>
        <Text style={styles.courseStatus}>{course.status}</Text>
      </View>
      {renderProgressBar(course.percentComplete)}
      <TouchableOpacity style={[styles.button, course.completionStatus === "completed" && styles.buttonCompleted]}>
        <Text style={[styles.buttonText, course.completionStatus === "completed" && styles.buttonTextCompleted]}>
          {course.completionStatus === "completed" ? "Review Course" : "Get Back Into It"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 12,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  courseProgress: {
    fontSize: 14,
    color: "#666",
  },
  bullet: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 4,
  },
  courseStatus: {
    fontSize: 14,
    color: "#666",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4169E1",
    borderRadius: 2,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4169E1",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonCompleted: {
    backgroundColor: "#4169E1",
    borderColor: "#4169E1",
  },
  buttonText: {
    color: "#4169E1",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonTextCompleted: {
    color: "white",
  },
})

