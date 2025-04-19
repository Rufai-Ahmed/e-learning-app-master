import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Search } from "lucide-react-native";

interface Transaction {
  status: string;
  charge_id: string | null;
  wallet_id: string;
  amount: string;
  payment_platform: string;
  payer_id: string;
  description: string;
  created_at: string;
  id: string;
  currency: string;
  course_id: string;
  transaction_type: string;
  payout_id: string | null;
  updated_at: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const TransactionItem = ({ item }: { item: Transaction }) => (
  <View style={styles.transactionItem}>
    <View
      style={[
        styles.iconContainer,
        item.transaction_type === "credit"
          ? styles.incomeIcon
          : styles.expenseIcon,
      ]}
    >
      <MaterialCommunityIcons
        name={item.transaction_type === "credit" ? "arrow-down" : "arrow-up"}
        size={24}
        color="#FFFFFF"
      />
    </View>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionDate}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
    <Text
      style={[
        styles.transactionAmount,
        item.transaction_type === "credit"
          ? styles.incomeText
          : styles.expenseText,
      ]}
    >
      {item.currency} {parseFloat(item.amount).toFixed(2)}
    </Text>
  </View>
);

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <BlurView intensity={50} tint="light" style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Search size={30} color="black" />
            <Text> Transactions not found </Text>
          </View>
        )}
      />
    </BlurView>
  );
};

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
});

export default RecentTransactions;
