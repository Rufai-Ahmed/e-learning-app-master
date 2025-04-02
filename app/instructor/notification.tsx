import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  MessageCircle,
  BookOpen,
  Award,
  Users,
  Calendar,
} from "lucide-react-native";
import { router } from "expo-router";

type NotificationType =
  | "message"
  | "course"
  | "achievement"
  | "enrollment"
  | "reminder";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  data?: {
    studentId?: string;
    courseId?: string;
    achievementId?: string;
  };
};

// Dummy data for demonstration
const dummyNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from John Doe",
    description: "I have a question about the React Native module",
    timestamp: "2 min ago",
    isRead: false,
    data: {
      studentId: "1",
    },
  },
  {
    id: "2",
    type: "course",
    title: "Course Update Required",
    description: "Android Development course needs content update for Week 3",
    timestamp: "1 hour ago",
    isRead: false,
    data: {
      courseId: "1",
    },
  },
  {
    id: "3",
    type: "achievement",
    title: "Student Achievement",
    description: "Sarah Williams completed all assignments with perfect scores",
    timestamp: "2 hours ago",
    isRead: true,
    data: {
      studentId: "4",
      achievementId: "1",
    },
  },
  {
    id: "4",
    type: "enrollment",
    title: "New Course Enrollment",
    description: "Mike Johnson enrolled in UI/UX Design Fundamentals",
    timestamp: "1 day ago",
    isRead: true,
    data: {
      studentId: "3",
      courseId: "3",
    },
  },
  {
    id: "5",
    type: "reminder",
    title: "Upcoming Live Session",
    description: "React Native Advanced Concepts - Tomorrow at 10:00 AM",
    timestamp: "1 day ago",
    isRead: false,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);

  const handleNotificationPress = (notification: Notification) => {
    // Mark notification as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Navigate based on notification type
    switch (notification.type) {
      case "message":
        if (notification.data?.studentId) {
          router.push({
            pathname: "/instructor/conversation/[id]",
            params: { id: notification.data.studentId },
          });
        }
        break;
      case "course":
        if (notification.data?.courseId) {
          router.push({
            pathname: "/instructor/course/[id]",
            params: { id: notification.data.courseId },
          });
        }
        break;
      case "enrollment":
        if (notification.data?.studentId) {
          router.push({
            pathname: "/instructor/student/[id]",
            params: { id: notification.data.studentId },
          });
        }
        break;
      // Add other navigation cases as needed
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageCircle size={24} color="#4169E1" />;
      case "course":
        return <BookOpen size={24} color="#FF6B6B" />;
      case "achievement":
        return <Award size={24} color="#FFB100" />;
      case "enrollment":
        return <Users size={24} color="#4CAF50" />;
      case "reminder":
        return <Calendar size={24} color="#9C27B0" />;
    }
  };

  const renderNotificationItem = ({
    item: notification,
  }: {
    item: Notification;
  }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(notification.type)}
      </View>
      <View style={styles.notificationContent}>
        <Text
          style={[
            styles.notificationTitle,
            !notification.isRead && styles.unreadText,
          ]}
        >
          {notification.title}
        </Text>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {notification.description}
        </Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter((n) => !n.isRead)?.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Bell size={24} color="#4169E1" />
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {notifications?.length > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={() =>
              setNotifications((prevNotifications) =>
                prevNotifications.map((n) => ({ ...n, isRead: true }))
              )
            }
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(notification) => notification.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#4169E1",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  markAllButton: {
    alignSelf: "flex-end",
  },
  markAllText: {
    color: "#4169E1",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  unreadNotification: {
    backgroundColor: "#F8F9FF",
    borderColor: "#E8EFFF",
  },
  notificationIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: "600",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
  },
});
