import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  BookOpen,
  Star,
  Clock,
  Calendar,
} from 'lucide-react-native';

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
};

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'course_updates',
      title: 'Course Updates',
      description: 'Get notified about new content and announcements',
      enabled: true,
      icon: <BookOpen size={24} color="#4169E1" />,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Receive notifications for new messages from instructors',
      enabled: true,
      icon: <MessageSquare size={24} color="#4CAF50" />,
    },
    {
      id: 'deadlines',
      title: 'Deadlines',
      description: 'Get reminders about upcoming assignments and deadlines',
      enabled: true,
      icon: <Clock size={24} color="#FF9800" />,
    },
    {
      id: 'reviews',
      title: 'Course Reviews',
      description: 'Reminders to review completed courses',
      enabled: true,
      icon: <Star size={24} color="#9C27B0" />,
    },
    {
      id: 'schedule',
      title: 'Schedule Reminders',
      description: 'Get reminders about scheduled live sessions',
      enabled: true,
      icon: <Calendar size={24} color="#4169E1" />,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <Text style={styles.sectionDescription}>
            Choose which notifications you'd like to receive
          </Text>
        </View>

        <View style={styles.settingsList}>
          {settings.map(setting => (
            <View key={setting.id} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                {setting.icon}
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>
                    {setting.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: '#E5E9F0', true: '#4169E1' }}
                thumbColor="white"
              />
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Bell size={20} color="#666" />
          <Text style={styles.infoText}>
            You can also manage notification settings in your device's system settings.
          </Text>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
  },
  settingsList: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
}); 