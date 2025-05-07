import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Share, Dimensions } from "react-native";
import {
  Svg,
  Defs,
  Rect,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
  Text as SvgText,
} from "react-native-svg";
import { Course } from "@/lib/interfaces/course";
import { api } from "@/lib/actions/api";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/hooks/useAppSelector";

// Capture screen dimensions for responsive sizing
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
  const token = useAppSelector((state: RootState) => state.user.userLoginToken);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getCoursesById(courseId, token);
        setCourse(res?.data);
      } catch (err) {
        console.warn('Error fetching course:', err);
      }
    })();
  }, [courseId, token]);

  const handleShare = async () => {
    const message = `Certificate: ${course?.name || ''}\nStudent: ${studentName}\nInstructor: ${instructorName}\nDate: ${date}`;
    try {
      await Share.share({ title: 'Certificate of Completion', message });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Svg
        width={screenWidth * 0.9}
        height={screenHeight * 0.8}
        viewBox="0 0 792 612"
      >
        <Defs>
          {/* Full-bleed multi-stop gradient */}
          <LinearGradient
            id="bgGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            gradientTransform="rotate(90)"
          >
            <Stop offset="0%" stopColor="#ffffff" />
            <Stop offset="50%" stopColor="#008080" />
            <Stop offset="100%" stopColor="#f1f2f2" />
          </LinearGradient>
        </Defs>

        {/* Background */}
        <Rect width="792" height="612" fill="url(#bgGradient)" />

        {/* Tonal watermark for depth */}
        <G opacity={0.1}>
          <Circle cx="396" cy="306" r="200" fill="#008080" />
        </G>

        {/* Certificate Title & Text */}
        <SvgText
          x="396"
          y="90"
          fontSize={36}
          fontFamily="Arial-BoldMT"
          fill="#ffffff"
          textAnchor="middle"
        >
          Certificate of Completion
        </SvgText>

        <SvgText
          x="396"
          y="150"
          fontSize={18}
          fontFamily="ArialMT"
          fill="#333333"
          textAnchor="middle"
        >
          This certifies that
        </SvgText>

        <SvgText
          x="396"
          y="190"
          fontSize={30}
          fontFamily="Arial-BoldMT"
          fill="#008080"
          textAnchor="middle"
        >
          {studentName}
        </SvgText>

        <SvgText
          x="396"
          y="230"
          fontSize={18}
          fontFamily="ArialMT"
          fill="#333333"
          textAnchor="middle"
        >
          has successfully completed the course
        </SvgText>

        <SvgText
          x="396"
          y="270"
          fontSize={24}
          fontFamily="Arial-BoldMT"
          fill="#4169E1"
          textAnchor="middle"
        >
          {course?.name || 'Loading...'}
        </SvgText>

        {/* Accent Divider */}
        <Path
          d="M 200 300 H 592"
          stroke="#4169E1"
          strokeWidth={2}
          opacity={0.6}
        />

        {/* Footer Info */}
        <SvgText
          x="40"
          y="580"
          fontSize={14}
          fontFamily="ArialMT"
          fill="#666666"
        >
          Date of Award: {date}
        </SvgText>

        <SvgText
          x="752"
          y="580"
          fontSize={14}
          fontFamily="ArialMT"
          fill="#666666"
          textAnchor="end"
        >
          Instructor: {instructorName}
        </SvgText>

        {/* Dual Borders */}
        <Rect
          x="8"
          y="8"
          width="776"
          height="596"
          stroke="#008080"
          strokeWidth={4}
          fill="none"
        />
        <Rect
          x="20"
          y="20"
          width="752"
          height="572"
          stroke="#4169E1"
          strokeWidth={2}
          fill="none"
          opacity={0.5}
        />
      </Svg>

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share Certificate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#008080',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});