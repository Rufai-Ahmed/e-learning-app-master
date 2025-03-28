import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { StarRating } from "./StarRating"

interface CourseCardProps {
  title: string
  author: string
  price: string
  rating: number
  reviews: number
  image: string
  isBestseller?: boolean
  onPress: () => void
}

export const CourseCard = ({
  title,
  author,
  price,
  rating,
  reviews,
  image,
  isBestseller,
  onPress,
}: CourseCardProps) => {
  
  //console.log(author)
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author}>{author}</Text>
        <View style={styles.ratingContainer}>
         <StarRating rating={rating} size={14} />
          <Text style={styles.reviews}>({reviews}) reviews</Text>
        </View>
        <Text style={styles.price}>NGN {price}</Text>
        {/* {isBestseller && (
          <View style={styles.bestsellerTag}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    marginLeft: 16,
    width: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical:5
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
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
    top: 12,
    right: 12,
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
})

