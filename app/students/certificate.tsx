import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import CertificateSVG from "@/components/CertificateSVG";

interface Certificate {
  student: {
    fullname: string;
  };
  course: {
    id: string;
    name: string;
    instructor: {
      fullname: string;
    };
  };
  created_at: string;
}

export default function CertificateScreen() {
  const params = useLocalSearchParams<{ certificate: string }>();
  const certificate: Certificate = JSON.parse(params.certificate);

  console.debug({ certificate });

  return (
    <View style={styles.container}>
      <View style={styles.certificateContainer}>
        <CertificateSVG
          studentName={certificate.student.fullname}
          courseId={certificate.course.id}
          instructorName={certificate.course.instructor.fullname}
          date={new Date(certificate.created_at || Date.now()).toLocaleDateString()}
        />
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  certificateContainer: {
    flex: 1,
    width: "100%",
    aspectRatio: 0.707, // A4 aspect ratio
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#4169E1",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
