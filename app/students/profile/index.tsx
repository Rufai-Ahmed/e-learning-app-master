import React from "react"
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  User,
  Wallet,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
  BookOpen,
  GraduationCap,
  Clock,
  Star,
} from "lucide-react-native"
import { router } from 'expo-router'

type StudentProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  level: string;
  enrolledCourses: number;
  completedCourses: number;
  totalHours: number;
  averageRating: number;
};

const dummyProfile: StudentProfile = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  avatar: null,
  level: 'Advanced Learner',
  enrolledCourses: 8,
  completedCourses: 5,
  totalHours: 45,
  averageRating: 4.8,
};

const menuItems = [
  {
    title: 'Account Settings',
    icon: <User size={24} color="#4169E1" />,
    route: '/students/profile/account',
  },
  {
    title: 'Payment Methods',
    icon: <Wallet size={24} color="#4CAF50" />,
    route: '/students/profile/payment-methods',
  },
  {
    title: 'Notifications',
    icon: <Bell size={24} color="#FF9800" />,
    route: '/students/profile/notifications',
  },
  {
    title: 'Privacy & Security',
    icon: <Shield size={24} color="#9C27B0" />,
    route: '/students/profile/privacy',
  },
  {
    title: 'Help & Support',
    icon: <HelpCircle size={24} color="#607D8B" />,
    route: '/students/profile/support',
  },
];

export default function ProfileScreen() {
  const student = dummyProfile;

  const handleLogout = () => {
    // Implement logout logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => router.push('/students/profile/settings')}
        >
          <Settings size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {student.avatar ? (
              <Image source={{ uri: student.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentLevel}>{student.level}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <BookOpen size={24} color="#4169E1" />
            <Text style={styles.statValue}>{student.enrolledCourses}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </View>
          
          <View style={styles.statCard}>
            <GraduationCap size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{student.completedCourses}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#FF9800" />
            <Text style={styles.statValue}>{student.totalHours}h</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
          
          <View style={styles.statCard}>
            <Star size={24} color="#9C27B0" />
            <Text style={styles.statValue}>{student.averageRating}</Text>
            <Text style={styles.statLabel}>Avg. Rating</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={24} color="#FF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#4169E1',
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  studentLevel: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF2F2',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
  },
}); 