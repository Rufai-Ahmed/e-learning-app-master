import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  CreditCard,
  AlertCircle,
} from 'lucide-react-native';

const predefinedAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export default function AddFundsScreen() {
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleContinue = () => {
    if (!amount && !customAmount) {
      Alert.alert('Error', 'Please select or enter an amount');
      return;
    }

    const finalAmount = customAmount || amount;
    if (parseFloat(finalAmount) < 100) {
      Alert.alert('Error', 'Minimum deposit amount is ₦100');
      return;
    }
    
    // In a real app, you would generate this URL from your backend with Paystack
    const paymentUrl = '';
    
    router.push({
      pathname: "/instructor/wallet/payment-webview",
      params: { url: paymentUrl }
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
        <Text style={styles.headerTitle}>Add Funds</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.paymentMethod}>
          <View style={styles.methodIcon}>
            {/* <Image 
              source={require('@/assets/paystack-logo.png')} 
              style={styles.paystackLogo}
              resizeMode="contain"
            /> */}
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>Paystack</Text>
            <Text style={styles.methodDescription}>
              Secure payments via Paystack
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Amount</Text>
        <View style={styles.amountsGrid}>
          {predefinedAmounts.map((predefinedAmount) => (
            <TouchableOpacity
              key={predefinedAmount}
              style={[
                styles.amountButton,
                amount === predefinedAmount.toString() && styles.selectedAmount
              ]}
              onPress={() => {
                setAmount(predefinedAmount.toString());
                setCustomAmount('');
              }}
            >
              <Text style={[
                styles.amountText,
                amount === predefinedAmount.toString() && styles.selectedAmountText
              ]}>
                ₦{predefinedAmount.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customAmountContainer}>
          <Text style={styles.customAmountLabel}>Or enter custom amount</Text>
          <View style={styles.customAmountInput}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.input}
              value={customAmount}
              onChangeText={(text) => {
                setCustomAmount(text);
                setAmount('');
              }}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.infoBox}>
          <AlertCircle size={20} color="#666" />
          <Text style={styles.infoText}>
            Deposits are processed instantly. Minimum deposit amount is ₦100.
            Transaction fees may apply based on your payment method.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!amount && !customAmount) && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!amount && !customAmount}
        >
          <Text style={styles.continueButtonText}>
            Continue to Payment
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 24,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paystackLogo: {
    width: '100%',
    height: '100%',
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  amountButton: {
    width: '31%',
    margin: '1%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  selectedAmount: {
    backgroundColor: '#EBF2FF',
    borderColor: '#4169E1',
  },
  amountText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedAmountText: {
    color: '#4169E1',
  },
  customAmountContainer: {
    marginTop: 24,
  },
  customAmountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  customAmountInput: {
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
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
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