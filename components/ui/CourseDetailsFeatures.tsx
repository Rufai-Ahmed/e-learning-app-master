import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const CourseFeatures = () => {
  const features = [
    { icon: "play-circle", text: "84 total hours on-demand video" },
    { icon: "document-text", text: "Support Files" },
    { icon: "newspaper", text: "9 Articles" },
    { icon: "infinite", text: "Full lifetime access" },
    { icon: "phone-portrait", text: "Access on mobile, desktop, and TV" },
    { icon: "ribbon", text: "Certificate of Completion" },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This course includes</Text>
      <View style={styles.list}>
        {features.map((feature, index) => (
          <View key={index} style={styles.item}>
            <Ionicons name={feature.icon as any} size={24} color="#4169E1" />
            <Text style={styles.itemText}>{feature.text}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

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
  list: {
    gap: 16,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  itemText: {
    color: "#333",
    fontSize: 16,
  },
})

