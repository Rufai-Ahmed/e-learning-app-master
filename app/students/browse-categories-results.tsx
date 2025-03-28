import { View, StyleSheet, FlatList, Text } from "react-native"
import { useRoute, type RouteProp } from "@react-navigation/native"
import { SearchBar } from "@/components/ui/SearchBar"
import { CourseListItem } from "@/components/ui/CourseListItems"
import { searchResults } from "@/mock-data/mock-data"
import { SafeAreaView } from "react-native-safe-area-context"


export default function SearchResultsScreen() {

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.sectionTitle}>All Categories</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseListItem
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
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    padding:10
  },
})

