import ActionButtons from "@/components/ui/InstructorActionButtons";
import DashboardInfo from "@/components/ui/InstructorDashboard";
import Header from "@/components/ui/InstructorHeader";
import PerformanceChart from "@/components/ui/InstructorPerformanceChart";
import RecentTransactions from "@/components/ui/InstructorRecentTransaction";
import Wallet from "@/components/ui/InstructorWallet";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

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

interface TransactionResponse {
  message: string;
  data: Transaction[];
}

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { showAlert } = useAlert();
  const userData = useAppSelector((state) => state.user.user);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const dispatch = useAppDispatch();

  const fetchTransactions = async () => {
    if (!userData?.id || !userToken) return;

    try {
      setLoading(true);
      const response = await api.getInstructorTransactions(
        userData.id,
        userToken
      );

      if (response && response.data) {
        setTransactions(response.data);
      } else {
        showAlert("error", "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showAlert("error", "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userData?.id, userToken]);

  // Refresh transactions when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [userData?.id, userToken])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <Header />
          <Wallet />
          <ActionButtons />
          {/* <PerformanceChart/> */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.title}>View All</Text>
            </TouchableOpacity>
          </View>
          <RecentTransactions transactions={transactions} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
});

export default HomeScreen;
