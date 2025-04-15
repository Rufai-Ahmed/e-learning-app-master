"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";

const { width } = Dimensions.get("window");
const tabs = ["Overview", "Curriculum", "Reviews", "Info"];

export default function CourseDetailScreen({ navigation }) {
  const course = useAppSelector((state) => state.courses.courseDetails);
  const token = useAppSelector((state) => state.user.userLoginToken);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const scrollViewRef = useRef(null);
  const tabPositions = useRef({});
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      // Adjust the API function if needed: here we assume course.id exists and the API returns { data: { ... } }
      const response = await api.getCoursesById(course?.id, token);
      setCourseDetails(response?.data?.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const measureTab = (tab, event) => {
    const { x, width } = event.nativeEvent.layout;
    tabPositions.current[tab] = { x, width };

    if (tab === activeTab) {
      setIndicatorWidth(width);
      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start();
    }
  };

  useEffect(() => {
    if (tabPositions.current[activeTab]) {
      const { x, width } = tabPositions.current[activeTab];
      setIndicatorWidth(width);
      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start();

      // Optionally scroll the tab bar to keep the active tab in view.
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: Math.max(0, x - width),
          animated: true,
        });
      }
    }
  }, [activeTab, indicatorAnim]);

  const renderTabContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#4169E1" style={styles.loadingIndicator} />;
    }

    // Make sure courseDetails is loaded before rendering tabs.
    if (!courseDetails) return null;

    switch (activeTab) {
      case "Overview":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.courseTitle}>{courseDetails.name}</Text>
            <Text style={styles.courseDescription}>{courseDetails.description}</Text>
            <View style={styles.instructorContainer}>
              {courseDetails.instructor.image_link ? (
                <Image
                  source={{ uri: courseDetails.instructor.image_link }}
                  style={styles.instructorImage}
                />
              ) : null}
              <Text style={styles.instructorName}>{courseDetails.instructor.fullname}</Text>
            </View>
            <Text style={styles.price}>
              Price: ₦{courseDetails.price}{" "}
              {courseDetails.discount && `(Discount: ${courseDetails.discount}%)`}
            </Text>
            <Text style={styles.rating}>Rating: {courseDetails.average_rating}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {courseDetails.category.map((cat, index) => (
                <View key={index} style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      case "Curriculum":
        return (
          <ScrollView style={styles.tabContent}>
            {courseDetails.modules.map((module) => (
              <View key={module.id} style={styles.moduleContainer}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
                {/* List lessons */}
                {module.lessons &&
                  module.lessons.map((lesson) => (
                    <TouchableOpacity
                      key={lesson.id}
                      style={styles.lessonItem}
                      onPress={() => navigation.navigate("LessonVideo", { lesson })}
                    >
                      <Text style={styles.lessonTitle}>
                        {lesson.title} ({lesson.duration})
                      </Text>
                    </TouchableOpacity>
                  ))}
                {/* Display quiz button if quiz exists */}
                {module.quiz && module.quiz.length > 0 && (
                  <TouchableOpacity
                    style={styles.quizButton}
                    onPress={() => navigation.navigate("Quiz", { quiz: module.quiz[0] })}
                  >
                    <Text style={styles.quizText}>Take Quiz</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        );
      case "Reviews":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.placeholderText}>Reviews will be shown here.</Text>
            {/* You may integrate a Reviews component here */}
          </View>
        );
      case "Info":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.infoText}>
              Created: {new Date(courseDetails.created_at).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              Updated: {new Date(courseDetails.updated_at).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              Enrolled: {courseDetails.enrolled ? "Yes" : "No"}
            </Text>
            <Text style={styles.infoText}>
              Total Students: {courseDetails.students ? courseDetails.students.length : 0}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#4169E1" />
      </TouchableOpacity>

      {/* Header image */}
      <View style={styles.headerContainer}>
        {courseDetails && courseDetails.image_link ? (
          <Image source={{ uri: courseDetails.image_link }} style={styles.courseImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Course Image</Text>
          </View>
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
              onLayout={(event) => measureTab(tab, event)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                transform: [{ translateX: indicatorAnim }],
              },
            ]}
          />
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 16,
  },
  headerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 18,
  },
  tabsWrapper: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  tabsContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6c757d",
  },
  activeTabText: {
    color: "#4361ee",
    fontWeight: "700",
  },
  indicator: {
    position: "absolute",
    height: 3,
    backgroundColor: "#4361ee",
    bottom: 0,
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    flex: 1,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  courseDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  moduleContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    paddingBottom: 16,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  lessonItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 16,
    color: "#333",
  },
  quizButton: {
    padding: 12,
    backgroundColor: "#4361ee",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  quizText: {
    color: "#FFF",
    fontWeight: "600",
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});

