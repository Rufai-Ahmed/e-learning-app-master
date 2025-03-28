import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

export const StarRating = ({ rating = 0, size = 16, color = '#FFD700' }: StarRatingProps) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, i) => (
        <Star key={`filled-${i}`} size={size} fill={color} color={color} />
      ))}
      {hasHalfStar && (
        <Star key="half" size={size} fill={color} color={color} strokeWidth={0} fillOpacity={0.5} />
      )}
      {[...Array(emptyStars)]?.map((_, i) => (
        <Star key={`empty-${i}`} size={size} color={color} fill="none" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
