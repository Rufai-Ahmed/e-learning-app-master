import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Search,
  ChevronRight,
  Building2,
} from "lucide-react-native";

type Bank = {
  id: string;
  name: string;
  code: string;
  logo: string | null;
};

// Dummy data for demonstration - Nigerian banks
const dummyBanks: Bank[] = [
  {
    id: "1",
    name: "Access Bank",
    code: "044",
    logo: null,
  },
  {
    id: "2",
    name: "Zenith Bank",
    code: "057",
    logo: null,
  },
  {
    id: "3",
    name: "First Bank",
    code: "011",
    logo: null,
  },
  {
    id: "4",
    name: "UBA",
    code: "033",
    logo: null,
  },
  {
    id: "5",
    name: "GTBank",
    code: "058",
    logo: null,
  },
  {
    id: "6",
    name: "Union Bank",
    code: "032",
    logo: null,
  },
  {
    id: "7",
    name: "Fidelity Bank",
    code: "070",
    logo: null,
  },
  {
    id: "8",
    name: "Ecobank",
    code: "050",
    logo: null,
  },
  {
    id: "9",
    name: "FCMB",
    code: "214",
    logo: null,
  },
  {
    id: "10",
    name: "Stanbic IBTC",
    code: "221",
    logo: null,
  },
];

export default function BanksScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [banks] = useState<Bank[]>(dummyBanks);

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bank: Bank) => {
    router.push({
      pathname: "/instructor/wallet/withdraw",
      params: { bank: encodeURIComponent(JSON.stringify(bank)) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Bank</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search banks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredBanks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={styles.bankCard}
            onPress={() => handleBankSelect(bank)}
          >
            <View style={styles.bankInfo}>
              {bank.logo ? (
                <Image source={{ uri: bank.logo }} style={styles.bankLogo} />
              ) : (
                <View style={styles.bankLogoPlaceholder}>
                  <Building2 size={24} color="#4169E1" />
                </View>
              )}
              <View style={styles.bankDetails}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.bankCode}>Code: {bank.code}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#666" />
          </TouchableOpacity>
        ))}

        {filteredBanks?.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No banks found</Text>
          </View>
        )}
      </ScrollView>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  bankLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  bankDetails: {
    marginLeft: 12,
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  bankCode: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
  },
});
