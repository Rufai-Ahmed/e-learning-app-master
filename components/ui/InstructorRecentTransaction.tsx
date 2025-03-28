import { View, Text, StyleSheet, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import {Search} from "lucide-react-native"

const transactionData = [
 /* { id: "1", type: "income", amount: 99.99, description: "Course Purchase", date: "2023-06-15" },
  { id: "2", type: "expense", amount: 500.0, description: "Withdrawal", date: "2023-06-14" },
  { id: "3", type: "income", amount: 149.99, description: "Course Purchase", date: "2023-06-13" },
  { id: "4", type: "income", amount: 79.99, description: "Course Purchase",
  date: "2023-06-12" },*/
]

const TransactionItem = ({ item }) => (
  <View style={styles.transactionItem}>
    <View style={[styles.iconContainer, item.type === "income" ? styles.incomeIcon : styles.expenseIcon]}>
      <MaterialCommunityIcons name={item.type === "income" ? "arrow-down" : "arrow-up"} size={24} color="#FFFFFF" />
    </View>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text style={[styles.transactionAmount, item.type === "income" ? styles.incomeText : styles.expenseText]}>
      ${item.amount.toFixed(2)}
    </Text>
  </View>
)

const RecentTransactions = () => {
  return (
    <BlurView intensity={50} tint="light" style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactionData}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={() => (
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <Search size={30} color="black" />
        <Text> Transactions not found </Text>
        </View>
        )}
      />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: "#48BB78",
  },
  expenseIcon: {
    backgroundColor: "#F56565",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  transactionDate: {
    fontSize: 14,
    color: "#A0AEC0",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeText: {
    color: "#48BB78",
  },
  expenseText: {
    color: "#F56565",
  },
})

export default RecentTransactions

