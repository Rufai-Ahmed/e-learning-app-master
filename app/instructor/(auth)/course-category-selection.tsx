import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 1, name: 'Web Development', icon: '🌐' },
  { id: 2, name: 'Mobile App Development', icon: '📱' },
  { id: 3, name: 'Data Science', icon: '📊' },
  { id: 4, name: 'Machine Learning', icon: '🤖' },
  { id: 5, name: 'Cloud Computing', icon: '☁️' },
  { id: 6, name: 'Cybersecurity', icon: '🔒' },
  { id: 7, name: 'UI/UX Design', icon: '🎨' },
  { id: 8, name: 'Blockchain', icon: '🔗' },
  { id: 9, name: 'DevOps', icon: '🔧' },
  { id: 10, name: 'Internet of Things', icon: '🏠' },
];

const CategorySelectionScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleProceed = () => {
    if (selectedCategories.length >= 5) {
      console.log('Selected categories:', selectedCategories);
      // Navigate to the next screen or perform any other action
      router.push('/students/(tabs)'); // Replace with your actual route
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4169E1', '#6495ED']}
        style={styles.header}
      >
        <Text style={styles.title}>Choose Your Interests</Text>
        <Text style={styles.subtitle}>Select at least 5 topics to personalize your experience</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategories.includes(category.id) && styles.selectedCategory,
              ]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              {selectedCategories.includes(category.id) && (
                <View style={styles.checkmark}>
                  <Check size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectionCount}>
          {selectedCategories.length} / 5 selected
        </Text>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            selectedCategories.length < 5 && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceed}
          disabled={selectedCategories.length < 5}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  selectedCategory: {
    backgroundColor: '#4169E1',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  selectionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  proceedButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CategorySelectionScreen;
