import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Svg,
  Text as SvgText,
  Rect,
  Path,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Course } from "@/lib/interfaces/course";
import { api } from "@/lib/actions/api";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/hooks/useAppSelector";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

interface CertificateSVGProps {
  studentName: string;
  courseId: string;
  instructorName: string;
  date: string;
}

export default function CertificateSVG({
  studentName,
  courseId,
  instructorName,
  date,
}: CertificateSVGProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const userLoginToken = useAppSelector(
    (state: RootState) => state.user.userLoginToken
  );

  useEffect(() => {
    const fetchCourse = async () => {
      const course = await api.getCoursesById(courseId, userLoginToken);
      setCourse(course?.data);
    };
    fetchCourse();
  }, [courseId]);

  const generateSVGString = () => {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="792" height="612" viewBox="0 0 792 612" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="headerGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4169E1" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#008080" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <!-- Background with subtle pattern -->
  <rect width="762.665" height="577.575" x="14.829" y="15.312" fill="#ffffff"/>
  
  <!-- Decorative header bar -->
  <rect width="762.665" height="80" x="14.829" y="15.312" fill="url(#headerGradient)"/>

  <!-- Decorative Elements -->
  <g>
    <circle cx="396" cy="306" r="150" fill="#f1f2f2" opacity="0.3"/>
    <path d="M 324.987,221.342 h 142.034 l -2.84038,8.74667 2.84038,9.62733 H 324.987 l 4.26059,-9.18634 -4.26059,-9.18766 z" fill="#4169E1" opacity="0.7"/>
    <path d="M 452.19212,194.30857 C 400,150 350,180 300,150" stroke="#008080" stroke-width="2" fill="none" opacity="0.5"/>
  </g>

  <!-- Title -->
  <text x="396" y="107.315" font-size="42" font-family="Arial-BoldMT" fill="#ffffff" text-anchor="middle">Certificate of Completion</text>

  <!-- Certificate Text -->
  <text x="396" y="326.274" font-size="16" font-family="ArialMT" fill="#414042" text-anchor="middle">This certificate has been awarded for successfully completing the course</text>
  <text x="396" y="356.274" font-size="24" font-family="Arial-BoldMT" fill="#4169E1" text-anchor="middle">${
    course?.name || ""
  }</text>

  <!-- Recipient Info -->
  <text x="396" y="426.274" font-size="20" font-family="Arial-BoldMT" fill="#414042" text-anchor="middle">${studentName}</text>

  <!-- Date and Instructor -->
  <text x="137.111" y="501.274" font-size="14" font-family="ArialMT" fill="#808285">Date of Award: ${date}</text>
  <text x="654.829" y="501.274" font-size="14" font-family="ArialMT" fill="#808285" text-anchor="end">Certified by: ${instructorName}</text>

  <!-- Border with double stroke -->
  <rect width="762.665" height="577.575" x="14.829" y="15.312" fill="none" stroke="#4169E1" stroke-width="2"/>
  <rect width="752.665" height="567.575" x="19.829" y="20.312" fill="none" stroke="#008080" stroke-width="1" opacity="0.5"/>
</svg>`;
  };

  const handleDownload = async () => {
    try {
      // Generate SVG string with current data
      const svgString = generateSVGString();

      // Create temporary file
      const fileUri = FileSystem.documentDirectory + "certificate.svg";
      await FileSystem.writeAsStringAsync(fileUri, svgString);

      // Share file
      await Sharing.shareAsync(fileUri, {
        mimeType: "image/svg+xml",
        dialogTitle: "Download Certificate",
        UTI: "public.svg-image",
      });

      // Cleanup
      await FileSystem.deleteAsync(fileUri);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 792 612">
        <Defs>
          <LinearGradient id="headerGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#4169E1" stopOpacity="0.8" />
            <Stop offset="1" stopColor="#008080" stopOpacity="0.8" />
          </LinearGradient>
        </Defs>

        {/* Background with subtle pattern */}
        <Rect
          width="762.665"
          height="577.575"
          x="14.829"
          y="15.312"
          fill="#ffffff"
        />

        {/* Decorative header bar */}
        <Rect
          width="762.665"
          height="80"
          x="14.829"
          y="15.312"
          fill="url(#headerGradient)"
        />

        {/* Decorative Elements */}
        <G>
          <Circle cx="396" cy="306" r="150" fill="#f1f2f2" opacity="0.3" />
          <Path
            d="M 324.987,221.342 h 142.034 l -2.84038,8.74667 2.84038,9.62733 H 324.987 l 4.26059,-9.18634 -4.26059,-9.18766 z"
            fill="#4169E1"
            opacity="0.7"
          />
          <Path
            d="M 452.19212,194.30857 C 400,150 350,180 300,150"
            stroke="#008080"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </G>

        {/* Title */}
        <SvgText
          x="396"
          y="107.315"
          fontSize="42"
          fontFamily="Arial-BoldMT"
          fill="#ffffff"
          textAnchor="middle"
        >
          Certificate of Completion
        </SvgText>

        {/* Certificate Text */}
        <SvgText
          x="396"
          y="326.274"
          fontSize="16"
          fontFamily="ArialMT"
          fill="#414042"
          textAnchor="middle"
        >
          This certificate has been awarded for successfully completing the
          course
        </SvgText>
        <SvgText
          x="396"
          y="356.274"
          fontSize="24"
          fontFamily="Arial-BoldMT"
          fill="#4169E1"
          textAnchor="middle"
        >
          {course?.name}
        </SvgText>

        {/* Recipient Info */}
        <SvgText
          x="396"
          y="426.274"
          fontSize="20"
          fontFamily="Arial-BoldMT"
          fill="#414042"
          textAnchor="middle"
        >
          {studentName}
        </SvgText>

        {/* Date and Instructor */}
        <SvgText
          x="137.111"
          y="501.274"
          fontSize="14"
          fontFamily="ArialMT"
          fill="#808285"
        >
          Date of Award: {date}
        </SvgText>

        <SvgText
          x="654.829"
          y="501.274"
          fontSize="14"
          fontFamily="ArialMT"
          fill="#808285"
          textAnchor="end"
        >
          Certified by: {instructorName}
        </SvgText>

        {/* Border with double stroke */}
        <Rect
          width="762.665"
          height="577.575"
          x="14.829"
          y="15.312"
          fill="none"
          stroke="#4169E1"
          strokeWidth="2"
        />
        <Rect
          width="752.665"
          height="567.575"
          x="19.829"
          y="20.312"
          fill="none"
          stroke="#008080"
          strokeWidth="1"
          opacity="0.5"
        />
      </Svg>

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download Certificate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButton: {
    marginTop: 20,
    backgroundColor: "#4169E1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
