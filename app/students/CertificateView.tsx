import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import ViewShot from "react-native-view-shot";

export default function CertificateView({
  certificate,
  onClose,
}: {
  certificate: any;
  onClose?: () => void;
}) {
  const viewShotRef = useRef<any>(null);

  const handleDownload = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      // Share or save the image
      await Share.share({ url: uri, message: "My Course Certificate" });
    }
  };

  const { course, student } = certificate.data || {};
  const date = new Date(student?.updated_at || Date.now()).toLocaleDateString();

  return (
    <View style={styles.overlay}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: "png", quality: 1.0 }}
        style={styles.certificateContainer}
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/certificate-badge.png")}
            style={styles.badge}
          />
          <Text style={styles.title}>Certificate of Completion</Text>
        </View>
        <Text style={styles.subtitle}>This is to certify that</Text>
        <Text style={styles.studentName}>{student?.fullname}</Text>
        <Text style={styles.subtitle}>
          has successfully completed the course
        </Text>
        <Text style={styles.courseName}>
          {course?.category?.[0]?.name || ""}: {course?.id}
        </Text>
        <Text style={styles.date}>Date: {date}</Text>
        <View style={styles.instructorRow}>
          {course?.instructor?.image_link ? (
            <Image
              source={{ uri: course.instructor.image_link }}
              style={styles.instructorImage}
            />
          ) : null}
          <Text style={styles.instructorName}>
            Instructor: {course?.instructor?.fullname}
          </Text>
        </View>
      </ViewShot>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Download Certificate</Text>
      </TouchableOpacity>
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  certificateContainer: {
    width: 340,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4169E1",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginVertical: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginVertical: 8,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginVertical: 8,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  instructorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 16,
    color: "#444",
  },
  downloadButton: {
    marginTop: 24,
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
  },
  closeButtonText: {
    color: "#4169E1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
