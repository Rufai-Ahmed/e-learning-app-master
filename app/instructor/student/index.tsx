import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Filter,
  ChevronRight,
  Users,
  BookOpen,
  Clock,
  Award,
} from "lucide-react-native";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  enrolledCourses: number;
  progress: number;
  lastActive: string;
  status: "active" | "inactive";
};

// Dummy data for demonstration
const dummyStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    enrolledCourses: 3,
    progress: 75,
    lastActive: "2024-02-27",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: null,
    enrolledCourses: 2,
    progress: 45,
    lastActive: "2024-02-26",
    status: "active",
  },
  // Add more dummy data as needed
];

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>(dummyStudents);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderStudentCard = ({ item: student }: { item: Student }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() =>
        router.push({
          pathname: "/instructor/student/[id]",
          params: { id: student.id },
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.studentInfo}>
          <View style={styles?.avatarContainer}>
            {student?.avatar ? (
              <Image source={{ uri: student?.avatar }} style={styles?.avatar} />
            ) : (
              <View style={[styles?.avatar, styles?.avatarPlaceholder]}>
                <Text style={styles?.avatarText}>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.statusIndicator,
                student.status === "active"
                  ? styles.statusActive
                  : styles.statusInactive,
              ]}
            />
          </View>
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentEmail}>{student.email}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <BookOpen size={16} color="#4169E1" />
            </View>
            <Text style={styles.statValue}>{student.enrolledCourses}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Award size={16} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{student.progress}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Clock size={16} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>
              {new Date(student.lastActive).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
            <Text style={styles.statLabel}>Last Active</Text>
          </View>
        </View>
      </View>
      <ChevronRight size={20} color="#666" style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Users size={24} color="#4169E1" />
          <Text style={styles.headerTitle}>Students</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive,
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? "#4169E1" : "#666"} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filterOptions}>
            {(["all", "active", "inactive"] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilter === filter && styles.filterOptionActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedFilter === filter && styles.filterOptionTextActive,
                  ]}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentCard}
        keyExtractor={(student) => student.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No students found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 16,
    color: "#1A1A1A",
  },
  filterButton: {
    padding: 11,
    borderRadius: 12,
    backgroundColor: "#F7F9FC",
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  filterButtonActive: {
    backgroundColor: "#EBF2FF",
    borderColor: "#4169E1",
  },
  filterOptions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F7F9FC",
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  filterOptionActive: {
    backgroundColor: "#4169E1",
    borderColor: "#4169E1",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterOptionTextActive: {
    color: "white",
  },
  content: {
    padding: 16,
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4169E1",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  statusActive: {
    backgroundColor: "#4CAF50",
  },
  statusInactive: {
    backgroundColor: "#FF4444",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  chevron: {
    marginLeft: 12,
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
