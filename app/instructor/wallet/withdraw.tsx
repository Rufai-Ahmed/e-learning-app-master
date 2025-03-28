import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Building2,
  DollarSign,
  ChevronRight,
  AlertCircle,
} from 'lucide-react-native';

export default function WithdrawScreen() {
  const params = useLocalSearchParams();
  const selectedBank = params.bank ? JSON.parse(decodeURIComponent(params.bank as string)) : null;
  
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleContinue = () => {
    if (!selectedBank) {
      Alert.alert('Error', 'Please select a bank');
      return;
    }

    if (!accountNumber || accountNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit account number');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) < 100) {
      Alert.alert('Error', 'Minimum withdrawal amount is ₦100');
      return;
    }

    router.push({
      pathname: "/instructor/wallet/withdraw-confirm",
      params: {
        bank: encodeURIComponent(JSON.stringify(selectedBank)),
        accountNumber,
        amount
      }
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
        <Text style={styles.headerTitle}>Withdraw Funds</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.bankSelector}
          onPress={() => router.push("/instructor/wallet/banks")}
        >
          <View style={styles.bankInfo}>
            {selectedBank ? (
              <>
                <View style={styles.bankIconContainer}>
                  <Building2 size={24} color="#4169E1" />
                </View>
                <View style={styles.bankDetails}>
                  <Text style={styles.bankName}>{selectedBank.name}</Text>
                  <Text style={styles.bankCode}>{selectedBank.code}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.placeholderText}>Select Bank</Text>
            )}
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter 10-digit account number"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount (₦)</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.infoBox}>
          <AlertCircle size={20} color="#666" />
          <Text style={styles.infoText}>
            Withdrawals typically process within 24 hours. Minimum withdrawal amount is ₦100.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedBank || !accountNumber || !amount) && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedBank || !accountNumber || !amount}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bankSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bankCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex:1
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 