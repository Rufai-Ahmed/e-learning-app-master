import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { api } from "@/lib/actions/api";
export const CourseHeader = () => {
  const courseDetails = useAppSelector((state) => state.courses.courseDetails);
  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.user.user);
  const token = useAppSelector((state) => state.user.userLoginToken);

  const buyCourse = async () => {
    try {
      setLoading(true);

      const res = await api.buyCourse(courseDetails?.id, token);

      router.push({
        pathname: "/webview",
        params: {
          uri: res?.data.link,
        },
      });

      console.log(res?.data);
      //   router.push('/students/course-learning-details'
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/*  <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>*/}
      </View>

      <View style={styles.preview}>
        <Image
          source={{
            uri: courseDetails?.image_link,
          }}
          style={styles.previewImage}
        />
      </View>

      <View style={styles.courseInfo}>
        <Text style={styles.title}>{courseDetails?.name}</Text>
        <Text style={styles.subtitle}>{courseDetails?.description}</Text>

        <StarRating rating={courseDetails?.average_rating || 0} size={14} />

        <View style={styles.meta}>
          <Text style={styles.metaText}>
            Created by {courseDetails?.instructor?.fullname}
          </Text>
          <Text style={styles.metaText}>
            Last updated {courseDetails?.updated_at}
          </Text>
        </View>

        <Text style={styles.price}>NGN {courseDetails?.price}</Text>

        <TouchableOpacity onPress={buyCourse} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>
            {loading ? "Loading..." : "Buy now"}
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Add to wishlist</Text>
          </TouchableOpacity>
        </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#4169E1",
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  preview: {
    width: "100%",
    height: 200,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  courseInfo: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Changed to black
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#333", // Changed to dark gray
    marginBottom: 16,
  },
  stats: {
    marginBottom: 16,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  ratingNumber: {
    color: "#000", // Changed to black
    fontWeight: "bold",
    marginRight: 8,
  },
  students: {
    color: "#666", // Changed to medium gray
    fontSize: 14,
  },
  meta: {
    marginBottom: 16,
  },
  metaText: {
    color: "#666", // Changed to medium gray
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Changed to black
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "#8A2BE2",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
