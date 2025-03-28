import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  BookOpen,
  Award,
  BarChart,
  Timer,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react-native';

type StudentProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  joinDate: string;
  enrolledCourses: {
    id: string;
    title: string;
    progress: number;
    lastAccessed: string;
  }[];
  achievements: {
    id: string;
    title: string;
    date: string;
    icon: string;
  }[];
  stats: {
    totalHours: number;
    completedCourses: number;
    averageScore: number;
    attendanceRate: number;
  };
};

// Dummy data for demonstration
const dummyProfile: StudentProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+234 123 456 7890',
  avatar: null,
  joinDate: '2024-01-15',
  enrolledCourses: [
    {
      id: '1',
      title: 'Introduction to React Native',
      progress: 75,
      lastAccessed: '2024-02-27',
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      progress: 45,
      lastAccessed: '2024-02-26',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Course Completion Master',
      date: '2024-02-20',
      icon: '🏆',
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      date: '2024-02-15',
      icon: '⭐',
    },
  ],
  stats: {
    totalHours: 45,
    completedCourses: 3,
    averageScore: 92,
    attendanceRate: 98,
  },
};

export default function StudentProfileScreen() {
  const { id } = useLocalSearchParams();
  const student = dummyProfile; // In a real app, fetch student data based on id

  const renderProgressBar = (progress: number) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <View style={styles.headerRight} />
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
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color="#666" />
              <Text style={styles.contactText}>{student.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color="#666" />
              <Text style={styles.contactText}>{student.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Calendar size={16} color="#666" />
              <Text style={styles.contactText}>
                Joined {new Date(student.joinDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#EBF2FF' }]}>
              <Clock size={20} color="#4169E1" />
            </View>
            <Text style={styles.statValue}>{student.stats.totalHours}h</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
              <CheckCircle2 size={20} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{student.stats.completedCourses}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
              <TrendingUp size={20} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{student.stats.averageScore}%</Text>
            <Text style={styles.statLabel}>Avg. Score</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#F3E5F5' }]}>
              <Timer size={20} color="#9C27B0" />
            </View>
            <Text style={styles.statValue}>{student.stats.attendanceRate}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enrolled Courses</Text>
          {student.enrolledCourses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => {
                // Navigate to course details
              }}
            >
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.courseStats}>
                  <View style={styles.courseStat}>
                    <BarChart size={16} color="#666" />
                    <Text style={styles.courseStatText}>{course.progress}% Complete</Text>
                  </View>
                  <View style={styles.courseStat}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.courseStatText}>
                      Last accessed {new Date(course.lastAccessed).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                {renderProgressBar(course.progress)}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {student.achievements.map(achievement => (
              <View key={achievement.id} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>
                  {new Date(achievement.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 32,
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
    marginBottom: 16,
  },
  contactInfo: {
    width: '100%',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseStatText: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4169E1',
    borderRadius: 2,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
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
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#666',
  },
}); 