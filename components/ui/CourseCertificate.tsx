import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAlert } from "@/hooks/useAlert";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface CertificateData {
  course: {
    id: string;
    instructor: {
      fullname: string;
      image_link: string;
    };
    category: Array<{
      name: string;
    }>;
    image_link: string;
  };
  student: {
    fullname: string;
    email: string;
    id: string;
    verified: boolean;
    categories: Array<{
      name: string;
    }>;
    image_link: string;
    roles: Array<{
      name: string;
    }>;
    created_at: string;
    updated_at: string;
  };
}

interface CourseCertificateProps {
  courseId: string;
}

export function CourseCertificate({ courseId }: CourseCertificateProps) {
  const [loading, setLoading] = useState(true);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const { showAlert } = useAlert();
  const userToken = useAppSelector((state) => state.user.userLoginToken);

  useEffect(() => {
    fetchCertificate();
  }, [courseId]);

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const response = await api.getCourseCertificate(courseId, userToken);
      setCertificateData(response?.data);
    } catch (error: any) {
      console.error("Error fetching certificate:", error?.response?.data);
      showAlert("error", "Failed to load certificate");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!certificateData) {
    return null;
  }

  const currentDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.certificateContainer}>
        <View style={styles.border}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Certificate of Completion</Text>
              <Text style={styles.subtitle}>This is to certify that</Text>
            </View>

            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>
                {certificateData.student.fullname}
              </Text>
              <Text style={styles.studentEmail}>
                {certificateData.student.email}
              </Text>
            </View>

            <View style={styles.courseInfo}>
              <Text style={styles.courseText}>
                has successfully completed the course
              </Text>
              <Text style={styles.courseName}>
                {certificateData.course.category
                  .map((cat) => cat.name)
                  .join(", ")}
              </Text>
            </View>

            <View style={styles.instructorSection}>
              <Text style={styles.instructorText}>Course Instructor</Text>
              <View style={styles.instructorInfo}>
                <Image
                  source={{ uri: certificateData.course.instructor.image_link }}
                  style={styles.instructorImage}
                />
                <Text style={styles.instructorName}>
                  {certificateData.course.instructor.fullname}
                </Text>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.date}>Issued on: {currentDate}</Text>
              <Text style={styles.certificateId}>
                Certificate ID: {certificateData.course.id.slice(0, 8)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  certificateContainer: {
    padding: 20,
    alignItems: "center",
  },
  border: {
    width: Dimensions.get("window").width - 40,
    borderWidth: 2,
    borderColor: "#4169E1",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  content: {
    padding: 30,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4169E1",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  studentInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  studentName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  studentEmail: {
    fontSize: 16,
    color: "#666",
  },
  courseInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  courseText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  courseName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  instructorSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  instructorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  instructorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  certificateId: {
    fontSize: 14,
    color: "#999",
  },
});
