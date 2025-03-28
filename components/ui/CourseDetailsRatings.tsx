import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const RatingsSection = () => {
  const ratings = [
    { stars: 5, percentage: 0 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ]

  const reviews = [
   {/* {
      name: "Shahrukh Altaf",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "I recently completed The Ultimate React Course 2024: React, Next.js, Redux & More on Udemy, and it was an outstanding learning experience. The instructor's clear explanations and hands-on projects made even advanced topics like Redux and Next.js easy to grasp. The course is well-structured, covering everything from React basics to real-world applications, which boosted my confidence in building modern web apps. I highly recommend it to anyone looking to master React and its ecosystem.",
    },
    {
      name: "Alexey Yudin",
      rating: 4.5,
      date: "3 weeks ago",
      comment:
        "The course is good. React is covered in great details. Next.js, however, is covered rather briefly. If you also go through the lessons on the official Next.js website, you'll learn a lot more.",
    }, */}
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Feedback</Text>

      <View style={styles.ratingOverview}>
        <View style={styles.overallRating}>
          <Text style={styles.ratingNumber}>0</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => (
              <Ionicons key={i} name="star" size={16} color="#4169E1" />
            ))}
          </View>
          <Text style={styles.ratingText}>Course Rating</Text>
        </View>

        <View style={styles.ratingBars}>
          {ratings.map((rating, index) => (
            <View key={index} style={styles.ratingBar}>
              <Text style={styles.starCount}>{rating.stars}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${rating.percentage}%` }]} />
              </View>
              <Text style={styles.percentage}>{rating.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/*<View style={styles.reviews}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.review}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color={i < review.rating ? "#4169E1" : "#E0E0E0"} />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>
        ))}
      </View>*/}

      <TouchableOpacity style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>See More Reviews</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  ratingOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  overallRating: {
    alignItems: "center",
    flex: 1,
  },
  ratingNumber: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#000",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  ratingText: {
    color: "#666",
    fontSize: 14,
  },
  ratingBars: {
    flex: 2,
    gap: 4,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starCount: {
    width: 15,
    textAlign: "right",
    color: "#666",
    fontSize: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4169E1",
    borderRadius: 4,
  },
  percentage: {
    width: 30,
    textAlign: "right",
    color: "#666",
    fontSize: 12,
  },
  reviews: {
    gap: 24,
  },
  review: {
    gap: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  reviewerInfo: {
    gap: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  stars: {
    flexDirection: "row",
  },
  reviewDate: {
    color: "#666",
    fontSize: 12,
  },
  reviewText: {
    color: "#333",
    lineHeight: 20,
  },
  showMoreButton: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#4169E1",
    borderRadius: 4,
    alignItems: "center",
  },
  showMoreText: {
    color: "#4169E1",
    fontSize: 16,
    fontWeight: "500",
  },
})

