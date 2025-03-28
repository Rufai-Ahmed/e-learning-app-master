import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const RecommendedCourses = () => {
  const courses = [
    {
      title: "React - The Complete Guide 2025 (incl. Next.js, Redux)",
      author: "Academind by Maximilian Schwarzmüller",
      rating: 4.6,
      reviews: 224700,
      price: "NGN 79,900.00",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l4.jpg-uqHwNgJFt3giyKY2k3FTYLit5FMGXd.jpeg",
      bestseller: true
    },
    {
      title: "Next.js 15 & React - The Complete Guide",
      author: "Maximilian Schwarzmüller",
      rating: 4.7,
      reviews: 21350,
      price: "NGN 99,900.00",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l4.jpg-uqHwNgJFt3giyKY2k3FTYLit5FMGXd.jpeg",
      bestseller: true
    },
    {
      title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
      author: "Jonas Schmedtmann",
      rating: 4.6,
      reviews: 26690,
      price: "NGN 99,900.00",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l4.jpg-uqHwNgJFt3giyKY2k3FTYLit5FMGXd.jpeg",
      bestseller: true
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students also bought</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            
            {course.bestseller && (
              <View style={styles.bestsellerTag}>
                <Text style={styles.bestsellerText}>BESTSELLER</Text>
              </View>
            )}
            
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
              <Text style={styles.author} numberOfLines={1}>{course.author}</Text>
              
              <View style={styles.rating}>
                <Text style={styles.ratingNumber}>{course.rating}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons 
                      key={i}
                      name="star" 
                      size={14} 
                      color={i < course.rating ? '#4169E1' : '#E0E0E0'} 
                    />
                  ))}
                </View>
                <Text style={styles.reviews}>({course.reviews.toLocaleString()})</Text>
              </View>
              
              <Text style={styles.price}>{course.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  scrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  courseCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bestsellerTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestsellerText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  author: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingNumber: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
  },
  reviews: {
    color: '#666',
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
