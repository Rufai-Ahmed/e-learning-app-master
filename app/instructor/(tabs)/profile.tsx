import Loader from "@/components/ui/Loader";
import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { api } from "@/lib/actions/api";
import { getInstructorCourses } from "@/lib/reducers/storeInstructorCourses";
import { router } from "expo-router";
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  User,
  Wallet
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InstructorProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  totalReviews: number;
};

const dummyProfile: InstructorProfile = {
  id: "1",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: null,
  role: "Senior Instructor",
  rating: 4.8,
  totalStudents: 1250,
  totalCourses: 8,
  totalReviews: 450,
};

const menuItems = [
  {
    title: "Account Settings",
    icon: <User size={24} color="#4169E1" />,
    route: "/instructor/profile/account",
  },
  {
    title: "Wallet & Payments",
    icon: <Wallet size={24} color="#4CAF50" />,
    route: "/instructor/wallet",
  },
  // {
  //   title: 'Notifications',
  //   icon: <Bell size={24} color="#FF9800" />,
  //   route: '/instructor/profile/notifications',
  // },
  {
    title: "Privacy & Security",
    icon: <Shield size={24} color="#9C27B0" />,
    route: "/instructor/profile/privacy",
  },
  {
    title: "Help & Support",
    icon: <HelpCircle size={24} color="#607D8B" />,
    route: "/instructor/profile/support",
  },
];

export default function ProfileScreen() {
  const instructor = useAppSelector((state) => state.user.user);
  const userData = useAppSelector((state) => state.user.user);
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Implement logout logic here
      // Simulate a successful logout
      await api.logoutUser(userData?.id, userToken); // Simulate network delay
      showAlert("success", "Logged out successfully");
      dispatch(getInstructorCourses(null));
      router.push("/");
    } catch (error) {
      console.error(error);
      if (err.response?.data.message) {
        showAlert("error", err.response?.data.message);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Failed to log out. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => router.push("/instructor/profile/settings")}
        >
          <Settings size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles?.avatarContainer}>
            {instructor?.image_link ? (
              <Image
                source={{ uri: instructor?.image_link }}
                style={styles?.avatar}
              />
            ) : (
              <View style={[styles?.avatar, styles?.avatarPlaceholder]}>
                <Text style={styles?.avatarText}>
                  {instructor?.fullname
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.instructorName}>{instructor?.fullname}</Text>
          <Text style={styles.instructorRole}>{instructor?.role}</Text>
        </View>

        <View style={styles.statsGrid}>
          {/* <View style={styles.statCard}>
            <BookOpen size={24} color="#4169E1" />
            <Text style={styles.statValue}>{instructor?.totalCourses}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          
          <View style={styles.statCard}>
            <User size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{instructor?.totalStudents}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          
          <View style={styles.statCard}>
            <Star size={24} color="#FF9800" />
            <Text style={styles.statValue}>{instructor?.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
           */}
          <View style={styles.statCard}>
            <MessageSquare size={24} color="#9C27B0" />
            <Text style={styles.statValue}>{instructor?.totalReviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color="#FF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
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
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#4169E1",
  },
  instructorName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  instructorRole: {
    fontSize: 16,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
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
    fontWeight: "700",
    color: "#1A1A1A",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  menuSection: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF2F2",
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF4444",
  },
});
