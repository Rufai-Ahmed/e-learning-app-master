import { useState } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Search, ShoppingCart } from "lucide-react-native"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"

interface SearchBarProps {
  initialValue?: string
  onSearch: (query: string) => void
}

export function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState(initialValue)

  const handleSubmit = () => {
    onSearch(searchText)
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 8,
    color: "#333",
  },
  cartButton: {
    padding: 8,
  },
})

