import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/hooks/useAppSelector';
import { api } from '@/lib/actions/api';
import { SearchChip } from '@/components/ui/SearchChip';
import { SearchBar } from '@/components/ui/SearchBar';
import { router } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getSearchData, getSearchTerm } from '@/lib/reducers/storeSearchData';

export default function SearchScreen() {
  const categories = useAppSelector(state => state.courses.categories);
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.user.userLoginToken)
  /*useEffect(() => {
    fetchTopSearches();
  }, []);

const fetchTopSearches = async () => {
    setLoading(true);
    try {
      const res = await api.topSearches();
      setTopSearches(res.data);
    } catch (err) {
      console.error("Failed to fetch top searches:", err);
    } finally {
      setLoading(false);
    }
  };*/

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    setQuery(query);
    setSearchResults([]); // Clear previous results

    try {
      const res = await api.searchCourses(query, token);
      if (res.data.length === 0) {
        setSearchResults([]); // No results found
      } else {
        dispatch(getSearchData(res.data))
        dispatch(getSearchTerm(query))
        setSearchResults(res.data);
        router.navigate('/students/search-results');
      }
    } catch (err) {
      console.error("Search failed:", err.response.data);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {searchLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* Initial Message (only shows before searching) */}
      {!query && !searchLoading && (
        <View style={styles.initialMessageContainer}>
          <Text style={styles.initialMessage}>🔍 Search for your favorite courses</Text>
        </View>
      )}

      {/* "Search not found" message */}
      {query && !searchLoading && searchResults.length === 0 && (
        <Text style={styles.noResults}>❌ No courses found for "{query}"</Text>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          
          <View style={styles.chipsContainer}>
            {topSearches?.map((term, index) => (
              <SearchChip key={index} label={term} onPress={() => handleSearch(term)} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  loader: {
    marginVertical: 16,
  },
  initialMessageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  initialMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});