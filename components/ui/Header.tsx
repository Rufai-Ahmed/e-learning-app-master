import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

interface HeaderProps {
  username: string;
  onNotificationPress: () => void;
}

export const Header = ({ username, onNotificationPress }: HeaderProps) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{greeting()}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
        <Bell size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
});
