import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"

const QuickActions = () => {
  const actions = [
    { icon: "video-plus", title: "New Course" , route: '/instructor/(tabs)/add-course'},
    /*{ icon: "message-text", title: "Messages", route:'/instructor/conversation' },
    { icon: "account-group", title: "Students", route:'/instructor/student' },*/
    { icon: "cog", title: "Settings", route:'/instructor/(tabs)/profile' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity onPress={() => router.push(action.route)} key={index} style={styles.actionItem}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={action.icon} size={24} color="#4169E1" />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionItem: {
    flex:1,
    height:50,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal:10
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    color: "#4A5568",
    textAlign: "center",
  },
})

export default QuickActions

