"use client"

import ForumContent from "@/components/ui/CourseLearningForum"
import HomeContent from "@/components/ui/CourseLearningHome"
import InfoScreen from "@/components/ui/CourseLearningInfo"
import QuizScreen from "@/components/ui/CourseLearningQuizGrades"
import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, Animated, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { api } from "@/lib/actions/api"
import { useAppSelector } from "@/hooks/useAppSelector"

const { width } = Dimensions.get("window")

const tabs = ["Home", "Grades", "Forums", "Info"]

export default function MainScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home")
  const [activeWeek, setActiveWeek] = useState(1)
  const scrollViewRef = useRef(null)
  const tabPositions = useRef({})
  const indicatorAnim = useRef(new Animated.Value(0)).current
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const [indicatorPosition, setIndicatorPosition] = useState(0)
  const [loading, setLoading] = useState(true)
  const course = useAppSelector(state => state.courses.courseDetails)
  const [courseDetails, setCourseDetails] = useState(null)
  const token = useAppSelector(state => state.user.userLoginToken)

  const fetchCourseDetails = async () => {
    setLoading(true)
    try {
      const response = await api.getCoursesById(course?.id, token)

      console.log(response.data)
      setCourseDetails(response.data)
    } catch (error) {
      console.error("Error fetching course details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchCourseDetails()
  }, [])


  const measureTab = (tab, event) => {
    const { x, width } = event.nativeEvent.layout
    tabPositions.current[tab] = { x, width }

    if (tab === activeTab) {
      setIndicatorWidth(width)
      setIndicatorPosition(x)
      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start()
    }
  }

  useEffect(() => {
    if (tabPositions.current[activeTab]) {
      const { x, width } = tabPositions.current[activeTab]
      setIndicatorWidth(width)
      setIndicatorPosition(x)

      Animated.spring(indicatorAnim, {
        toValue: x,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start()

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: Math.max(0, x - width), animated: true })
      }
    }
  }, [activeTab, indicatorAnim])

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Home":
        return loading ? (
          <ActivityIndicator size="large" color="#4169E1" />
        ) : (
          <HomeContent courseDetails={courseDetails} navigation={navigation} />
        )
      case "Grades":
        return <QuizScreen navigation={navigation} />
      case "Forums":
        return <ForumContent navigation={navigation} />
      case "Info":
        return <InfoScreen navigation={navigation} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContentContainer}
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

      <Animated.View style={styles.contentContainer}>{renderActiveTabContent()}</Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  tabsWrapper: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    position: "relative",
  },
  tabsContainer: {
    height: 56,
  },
  tabsContentContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6c757d",
    textAlign: "center",
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
  },
})

