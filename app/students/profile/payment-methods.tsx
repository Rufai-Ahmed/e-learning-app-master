import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  CreditCard,
  Plus,
  ChevronRight,
  Trash2,
} from 'lucide-react-native';

type PaymentMethod = {
  id: string;
  type: 'card';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
};

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '24',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '25',
      isDefault: false,
    },
  ]);

  const handleAddCard = () => {
    // Navigate to add card screen
    router.push('/students/profile/add-card');
  };

  const handleRemoveCard = (cardId: string) => {
    Alert.alert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(methods => methods.filter(m => m.id !== cardId));
          },
        },
      ],
    );
  };

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === cardId,
      })),
    );
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.addCardButton}
          onPress={handleAddCard}
        >
          <Plus size={24} color="#4169E1" />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {paymentMethods.map(method => (
            <View key={method.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <CreditCard size={24} color="#4169E1" />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardNumber}>
                    •••• •••• •••• {method.last4}
                  </Text>
                  <Text style={styles.cardExpiry}>
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                {!method.isDefault && (
                  <>
                    <TouchableOpacity
                      style={styles.defaultButton}
                      onPress={() => handleSetDefault(method.id)}
                    >
                      <Text style={styles.defaultButtonText}>Set Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveCard(method.id)}
                    >
                      <Trash2 size={20} color="#FF4444" />
                    </TouchableOpacity>
                  </>
                )}
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Secure Payments</Text>
          <Text style={styles.infoText}>
            Your payment information is encrypted and securely stored. We never store your full card details.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#4169E1',
    gap: 8,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardDetails: {
    marginLeft: 12,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  defaultButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#EBF2FF',
  },
  defaultButtonText: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
  defaultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
  },
  defaultBadgeText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 