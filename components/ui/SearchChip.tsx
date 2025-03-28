import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchChipProps {
  label: string;
  onPress: () => void;
}

export function SearchChip({ label, onPress }: SearchChipProps) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});
