import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native"
import { useRoute, type RouteProp } from "@react-navigation/native"
import { SearchBar } from "@/components/ui/SearchBar"
import { CourseListItem } from "@/components/ui/CourseListItems"
import { searchResults } from "@/mock-data/mock-data"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useState } from "react"
import { getSearchData, getSearchTerm } from "@/lib/reducers/storeSearchData"
import { api } from "@/lib/actions/api"
import { getCourseDetails } from "@/lib/reducers/storeUserCourses"
import { router } from "expo-router"


export default function SearchResultsScreen() {
  const searchData = useAppSelector(state => state.searchData.searchData)
  const searchTerm = useAppSelector(state => state.searchData.searchTerm)
  const dispatch = useAppDispatch()
  const [searchLoading, setSearchLoading] = useState(false)
  const token = useAppSelector(state => state.user.userLoginToken)

  const handleSearch = async (query: string) => {
    setSearchLoading(true);

    try {
      const res = await api.searchCourses(query, token);
      if (res.data.length === 0) {
        dispatch(getSearchData([]))
      } else {
        dispatch(getSearchData(res.data))
        dispatch(getSearchTerm(query))
      }
    } catch (err) {
      console.error("Search failed:", err.response.data);
      dispatch(getSearchData([]))
    } finally {
      setSearchLoading(false);
    }
  };

  
  const navigateToCourseDetails = (item) => {
    dispatch(getCourseDetails(item))
    router.push('/students/course-details')
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
      {searchLoading ? (
        <ActivityIndicator size="large" color="#4169E1" />
      ) : searchData.length === 0 ? (
        <Text style={styles.errorText}>No results found for "{searchTerm}"</Text>
      ) : (
        <FlatList
          data={searchData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseListItem
              title={item.name}
              author={item.instructor.fullname}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
              image={item.image_link}
              isBestseller={item.isBestseller}
              onPress={() => navigateToCourseDetails(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
})

