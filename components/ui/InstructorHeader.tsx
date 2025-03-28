import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { User, User2 } from 'lucide-react-native';

const Header = () => {
  const userData = useAppSelector(state => state.user.user)
  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <User2 color={'black'} style={{marginRight:10}}/>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{userData?.fullname}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('/instructor/notification')} style={styles.notificationButton}>
        <MaterialCommunityIcons name="bell-outline" size={24} color="#4A5568" />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4169E1',
  },
});

export default Header;
