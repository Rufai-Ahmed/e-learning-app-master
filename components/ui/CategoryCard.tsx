import { TouchableOpacity, Text, StyleSheet } from "react-native"
import type { LucideIcon } from "lucide-react-native"

interface CategoryCardProps {
  title: string
  icon: LucideIcon
  color: string
  onPress: () => void
}

export const CategoryCard = ({ title, icon: Icon, color, onPress }: CategoryCardProps) => {
  console.log(title, 'title')
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: '#FF6B6B' }]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal:10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textTransform:'capitalize'
  },
})

