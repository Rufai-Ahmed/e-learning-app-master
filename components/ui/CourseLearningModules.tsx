'use client';

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ModuleProgress() {
  const modules = [
    { number: 1, completed: true },
    { number: 2, completed: false, inProgress: true },
    { number: 3, completed: false },
    { number: 4, completed: false },
    { number: 5, completed: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module</Text>
      <View style={styles.progressContainer}>
        {modules.map((module, index) => (
          <View
            key={index}
            style={[
              styles.moduleItem,
              module.completed && styles.completed,
              module.inProgress && styles.inProgress,
            ]}
          >
            <Text style={styles.moduleText}>{module.number}</Text>
          </View>
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
    color: '#FFFFFF',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
  },
  inProgress: {
    borderColor: '#4169E1',
  },
  moduleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});