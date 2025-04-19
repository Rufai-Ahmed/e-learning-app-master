import  { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Building2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react-native";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAlert } from "@/hooks/useAlert";
import React from "react";

export default function WithdrawConfirmScreen() {
  const params = useLocalSearchParams();
  const bank = params.bank
    ? JSON.parse(decodeURIComponent(params.bank as string))
    : null;
  const accountNumber = params.accountNumber as string;
  const amount = params.amount as string;
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountName, setAccountName] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const userData = useAppSelector((state) => state.user.user);

  const handleConfirm = async () => {
    if (!accountName) {
      showAlert("error", "Please wait for account verification to complete");
      return;
    }

    setIsProcessing(true);

    try {
      // First, add or update the bank account
      await api.addInstructorBankAccount(
        userData.id,
        {
          account_bank: bank.code,
          account_number: accountNumber,
          currency: "NGN",
        },
        userToken
      );

      // Then request the payout
      await api.requestInstructorPayout(
        userData.id,
        {
          amount: parseFloat(amount),
        },
        userToken
      );

      showAlert(
        "success",
        "Your withdrawal request has been submitted successfully"
      );

      // Navigate back to instructor dashboard
      router.push({
        pathname: "/instructor",
      });
    } catch (error: any) {
      console.error("Error processing withdrawal:", error?.response?.data);
      showAlert(
        "error",
        error?.response?.data?.message || "Failed to process withdrawal"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    async function fetchAccountName() {
      if (bank && accountNumber) {
        setVerifying(true);
        try {
          const result = await api.verifyAccountDetails({
            account_bank: bank.code,
            account_number: accountNumber,
            currency: "NGN",
          });
          // Assuming the API returns the account name as string.
          setAccountName(result?.account_name);
        } catch (error: any) {
          console.error("Error verifying account details:", error);
          showAlert("error", "Unable to verify account details.");
        } finally {
          setVerifying(false);
        }
      }
    }
    fetchAccountName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Withdrawal</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bank Details</Text>
          <View style={styles.bankInfo}>
            <View style={styles.bankIconContainer}>
              <Building2 size={24} color="#4169E1" />
            </View>
            <View style={styles.bankDetails}>
              <Text style={styles.bankName}>{bank?.name}</Text>
              <Text style={styles.bankCode}>Bank Code: {bank?.code}</Text>
              <Text style={styles.accountNumber}>Account: {accountNumber}</Text>
              {verifying ? (
                <ActivityIndicator size="small" color="#4169E1" />
              ) : (
                accountName && (
                  <Text style={styles.accountName}>
                    Account Name: {accountName}
                  </Text>
                )
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>
              ₦{parseFloat(amount).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <AlertCircle size={20} color="#666" />
          <Text style={styles.infoText}>
            Please verify all details before confirming. Withdrawals typically
            process within 24 hours.
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bank</Text>
            <Text style={styles.summaryValue}>{bank?.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Account Number</Text>
            <Text style={styles.summaryValue}>{accountNumber}</Text>
          </View>
          {accountName && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Account Name</Text>
              <Text style={styles.summaryValue}>{accountName}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>
              ₦{parseFloat(amount).toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Time</Text>
            <Text style={styles.summaryValue}>24 hours</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            isProcessing && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Text style={styles.confirmButtonText}>Processing...</Text>
          ) : (
            <View style={styles.confirmButtonContent}>
              <CheckCircle2 size={20} color="white" />
              <Text style={styles.confirmButtonText}>Confirm Withdrawal</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  bankIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  bankCode: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  accountNumber: {
    fontSize: 14,
    color: "#666",
  },
  accountName: { fontSize: 14, color: "#4169E1", marginTop: 4 },
  amountContainer: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    alignItems: "center",
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  summaryBox: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  confirmButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
