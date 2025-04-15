import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { StarRating } from "./StarRating";

interface CourseListItemProps {
  title: string;
  author: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  isBestseller?: boolean;
  onPress: () => void;
}

export const CourseListItem = ({
  title,
  author,
  price,
  rating,
  reviews,
  image,
  isBestseller,
  onPress,
}: CourseListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author}>{author}</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={rating || 0} size={14} />
          <Text style={styles.reviews}>({reviews || 0})</Text>
        </View>
        <Text style={styles.price}>$ {price}</Text>
        {/* {isBestseller && (
          <View style={styles.bestsellerTag}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  reviews: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4169E1",
  },
  bestsellerTag: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestsellerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
});
