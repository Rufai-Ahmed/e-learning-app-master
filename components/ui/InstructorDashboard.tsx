import { View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const DashboardInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="book-open-variant" size={30} color="#4169E1" />
        <View>
          <Text style={styles.infoValue}>12</Text>
          <Text style={styles.infoLabel}>Courses</Text>
        </View>
      </View>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="account-group" size={30} color="#4169E1" />
        <View>
          <Text style={styles.infoValue}>1,234</Text>
          <Text style={styles.infoLabel}>Students</Text>
        </View>
      </View>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="star" size={30} color="#4169E1" />
        <View>
          <Text style={styles.infoValue}>4.8</Text>
          <Text style={styles.infoLabel}>Avg. Rating</Text>
        </View>
      </View>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="currency-usd" size={30} color="#4169E1" />
        <View>
          <Text style={styles.infoValue}>$12,345</Text>
          <Text style={styles.infoLabel}>Total Earnings</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
})

export default DashboardInfo

