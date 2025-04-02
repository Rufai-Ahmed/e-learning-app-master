import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppSelector } from "@/hooks/useAppSelector";
import { User } from "lucide-react-native";

export const InstructorProfile = () => {
  const courseDetails = useAppSelector((state) => state.courses.courseDetails);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructor</Text>

      <View style={styles.profile}>
        {courseDetails?.instructor?.image_link ? (
          <Image
            source={{
              uri: courseDetails?.instructor?.image_link,
            }}
            style={styles?.avatar}
          />
        ) : (
          <User size={35} color="black" />
        )}

        <View style={styles.info}>
          <Text style={styles.name}>{courseDetails?.instructor?.fullname}</Text>
          <Text style={styles.role}>Instructor</Text>
        </View>
      </View>

      {/* <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>4.7</Text>
          <Text style={styles.statLabel}>Instructor rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>466,836</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>2,100,866</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Hi, I'm Jonas! I'm one of Udemy's Top Instructors and all my premium courses have earned the best-selling status
        for outstanding performance and student satisfaction.
        {"\n\n"}
        I'm a full-stack web developer and designer with a passion for building beautiful web interfaces from scratch.
        I've been building websites and apps since 2010 and also have a Master...
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View profile</Text>
      </TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  profile: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  role: {
    color: "#666",
    fontSize: 16,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  stat: {
    flex: 1,
    minWidth: "40%",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    color: "#666",
  },
  bio: {
    color: "#333",
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});
