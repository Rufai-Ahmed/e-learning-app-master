import { CategoryCard } from "@/components/ui/CategoryCard";
import { CourseCard } from "@/components/ui/CourseCard";
import { CourseListItem } from "@/components/ui/CourseListItems";
import { Header } from "@/components/ui/Header";
import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { api } from "@/lib/actions/api";
import { Course } from "@/lib/interfaces/course";
import {
  getCategories,
  getCourseDetails,
} from "@/lib/reducers/storeUserCourses";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const userData = useAppSelector((state) => state.user.user);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courses, setCourses] = useState([]);
  const categories = useAppSelector((state) => state.courses.categories);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const navigateToSeeAllCourses = () => router.push("/students/see-all-course");

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await api.getUserCategories(userData?.id, userToken);
      dispatch(getCategories(categories?.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const courses = await api.getAllCourses(userData?.id, userToken);
      console.log(courses?.data[0].instructor);
      setCourses(courses?.data);
    } catch (error) {
      console.log(
        "Error fetching courses:",
        (error as { response: { data: string } }).response?.data
      );
      showAlert("error", "Failed to load courses. Please try again.");
    } finally {
      setLoadingCourses(false);
    }
  };

  const navigateToCourseDetails = (item: Course) => {
    dispatch(getCourseDetails(item));
    router.push("/students/course-details");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header username={userData?.fullname} onNotificationPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*<SearchBar />*/}

        {/* Categories */}
        {!loadingCategories && categories?.length ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore Categories</Text>
            </View>
            {loadingCategories ? (
              <ActivityIndicator size="large" color="#4169E1" />
            ) : (
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <CategoryCard
                    title={item.name}
                    icon={item.icon}
                    color={item.color}
                    onPress={() => {}}
                  />
                )}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        ) : (
          <></>
        )}
        {/* Recommended Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <TouchableOpacity onPress={navigateToSeeAllCourses}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {loadingCourses ? (
            <ActivityIndicator size="large" color="#4169E1" />
          ) : courses?.length === 0 ? (
            <View style={styles.noCoursesContainer}>
              <Text style={styles.noCoursesText}>No courses found.</Text>
            </View>
          ) : (
            <FlatList
              data={courses}
              renderItem={({ item }: { item: Course }) => (
                <CourseCard
                  title={item.name}
                  author={item?.instructor?.fullname}
                  price={item.price}
                  rating={+item.average_rating || 0}
                  reviews={+item.average_rating || 0}
                  image={item.image_link}
                  isBestseller={item.isBestseller}
                  onPress={() => navigateToCourseDetails(item)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* Most Popular Courses */}
        {courses.length ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore Courses</Text>
            </View>
            {courses?.slice(0, 4).map((course: Course) => (
              <CourseListItem
                key={course.id}
                title={course.name}
                author={course?.instructor?.fullname}
                price={course.price}
                rating={+course.rating || 0}
                reviews={+course.reviews || 0}
                image={course.image_link}
                isBestseller={course.isBestseller}
                onPress={() => navigateToCourseDetails(course)}
              />
            ))}
            <TouchableOpacity onPress={() => router.push("/students/search")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Courses</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <FlatList
            data={recommendedCourses}
            renderItem={({ item }) => (
              <CourseCard
                title={item.title}
                author={item.author}
                price={item.price}
                rating={item.rating}
                reviews={item.reviews}
                image={item.image}
                isBestseller={item.isBestseller}
                onPress={() => {}}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 16,
    color: "#4169E1",
    fontWeight: "600",
    marginTop: 10
  },
  noCoursesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noCoursesText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: "#4169E1",
    padding: 10,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
