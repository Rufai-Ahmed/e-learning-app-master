import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
//import { Search } from 'lucide-react-native';

export const SearchBar = () => {
  return (
    <View style={styles.container}>
    {/*  <Search size={20} color="#666" style={styles.icon} />*/}
      <TextInput
        style={styles.input}
        placeholder="Search for courses"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
});
