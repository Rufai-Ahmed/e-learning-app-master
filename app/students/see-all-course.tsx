import { CourseListItem } from '@/components/ui/CourseListItems';
import { Header } from '@/components/ui/Header';
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const filters = {
  level: ['Beginner', 'Intermediate', 'Advanced'],
  price: ['Free', 'Paid'],
  rating: ['4.5+', '4.0+', '3.5+'],
};

const CourseListingScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    level: [],
    price: [],
    rating: [],
  });

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const current = [...(prev[category] || [])];
      const index = current.indexOf(value);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      return { ...prev, [category]: current };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBack
        onBackPress={() => {}}
        onSettingsPress={() => {}}
      />
      
      {/* Filters */}
      <View style={styles.filters}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Object.entries(filters)}
          renderItem={({ item: [category, values] }) => (
            <View style={styles.filterGroup}>
              {values.map(value => (
                <Chip
                  key={value}
                  selected={selectedFilters[category]?.includes(value)}
                  onPress={() => toggleFilter(category, value)}
                  style={styles.chip}
                  selectedColor="#4169E1"
                >
                  {value}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      {/* Course List */}
      <FlatList
        data={[
          {
            id: '1',
            title: 'The Complete Python Bootcamp From Zero to Hero in Python',
            author: 'Jose Portilla, Pierian Training',
            price: '99,900.00',
            rating: 4.6,
            reviews: 528072,
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-30%20at%2020.49.49_1fa026af.jpg-f3zCsWEhD07AX4Fo2rxVmbImBqIJYL.jpeg',
            isBestseller: true,
          },
          // Add more courses
        ]}
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
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filters: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterGroup: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  chip: {
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
  },
});

export default CourseListingScreen;