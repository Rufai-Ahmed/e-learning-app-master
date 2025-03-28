'use client';

import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const instructors = [
  {
    name: 'Chris J. Vargo',
    title: 'Associate Professor • College of Media, Communication and Information',
    image: 'https://placeholder.com/150',
  },
  {
    name: 'Harsha Gangadharbatla',
    title: 'Associate Professor • Advertising, Public Relations and Media Design',
    image: 'https://placeholder.com/150',
  },
];

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Instructors</Text>
        {instructors.map((instructor, index) => (
          <TouchableOpacity key={index} style={styles.instructorCard}>
            <Image
              source={{ uri: instructor.image }}
              style={styles.instructorImage}
            />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{instructor.name}</Text>
              <Text style={styles.instructorTitle}>{instructor.title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Description</Text>
        <Text style={styles.description}>
          Welcome to Introduction to Digital Advertising! You're joining thousands of
          learners currently enrolled in the course. I'm excited to have you in the class
          and look forward to your contributions to the learning community.

          To begin, I recommend taking a few minutes to explore the course site. Review
          the material we'll cover each week, and preview the assignments you'll need
          to complete to pass the course.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 12,
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    color: '#666666',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
});