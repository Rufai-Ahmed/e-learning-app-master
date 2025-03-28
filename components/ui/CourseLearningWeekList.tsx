'use client';

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const weeks = [
  { id: 1, completed: true },
  { id: 2, inProgress: true },
  { id: 3, locked: true },
  { id: 4, locked: true },
  { id: 5, locked: true },
];

export default function WeeksList() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weeks</Text>
      <View style={styles.weeksContainer}>
        {weeks.map((week) => (
          <TouchableOpacity
            key={week.id}
            style={[
              styles.weekItem,
              week.completed && styles.completed,
              week.inProgress && styles.inProgress,
              week.locked && styles.locked,
            ]}
            onPress={() => navigation.navigate('WeekContent', { weekId: week.id })}
            disabled={week.locked}
          >
            <Text style={styles.weekText}>{week.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  weeksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  completed: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
  },
  inProgress: {
    borderColor: '#4169E1',
  },
  locked: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E5E5E5',
  },
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});