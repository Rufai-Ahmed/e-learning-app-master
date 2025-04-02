import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/hooks/useAppSelector";
import { api } from "@/lib/actions/api";
import { SearchChip } from "@/components/ui/SearchChip";
import { SearchBar } from "@/components/ui/SearchBar";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSearchData, getSearchTerm } from "@/lib/reducers/storeSearchData";
import { Course } from "@/lib/interfaces/course";
import { getCourseDetails } from "@/lib/reducers/storeUserCourses";

export default function SearchScreen() {
  const categories = useAppSelector((state) => state.courses.categories);
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.userLoginToken);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    setQuery(query);
    setSearchResults([]); // Clear previous results

    try {
      const res = await api.searchCourses(query, token);
      if (res.data?.length === 0) {
        setSearchResults([]); // No results found
      } else {
        dispatch(getSearchData(res.data));
        dispatch(getSearchTerm(query));
        setSearchResults(res.data);
      }
    } catch (err: any) {
      console.error("Search failed:", err.response?.data || err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const navigateToCourseDetails = (item: Course) => {
    dispatch(getCourseDetails(item));
    router.push("/students/course-details");
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigateToCourseDetails(course)}
    >
      {course.image_link ? (
        <Image source={{ uri: course.image_link }} style={styles.courseImage} />
      ) : (
        <View style={[styles.courseImage, styles.imagePlaceholder]}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.courseInstructor}>
          Instructor: {course.instructor?.fullname}
        </Text>
        <Text style={styles.coursePrice}>Price: {course.price}</Text>
        <Text style={styles.courseRating}>Rating: {course.average_rating}</Text>
      </View>
    </TouchableOpacity>
  );

  // Fetch all courses on initial mount by querying with an empty string.
  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {searchLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {/* Initial Message (only shows before a search if no results) */}
      {!query && !searchLoading && searchResults?.length === 0 && (
        <View style={styles.initialMessageContainer}>
          <Text style={styles.initialMessage}>
            🔍 Search for your favorite courses
          </Text>
        </View>
      )}

      {/* "Search not found" message */}
      {query && !searchLoading && searchResults?.length === 0 && (
        <Text style={styles.noResults}>❌ No courses found for "{query}"</Text>
      )}

      {/* Search Results List */}
      {searchResults?.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CourseCard course={item} />}
          contentContainerStyle={styles.resultsList}
        />
      )}

      {/* Top Searches Chips */}
      <ScrollView style={styles.chipsContainer} horizontal>
        {topSearches.map((term, index) => (
          <SearchChip
            key={index}
            label={term}
            onPress={() => handleSearch(term)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loader: {
    marginVertical: 16,
  },
  initialMessageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  initialMessage: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
  chipsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  imagePlaceholderText: {
    color: "#555",
    fontSize: 12,
  },
  courseInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  courseInstructor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  coursePrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  courseRating: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
