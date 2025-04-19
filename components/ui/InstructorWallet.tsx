import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const WalletOverview = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const userData = useAppSelector(state => state.user.user)
  const userToken = useAppSelector(state => state.user.userLoginToken)
  const dispatch = useAppDispatch()
  
  
  
  
  return (
    <LinearGradient
      colors={['#4299E1', '#3182CE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text
        style={styles.balanceAmount}>${parseFloat(userData?.wallet?.balance).toLocaleString()}</Text>
      </View>
    {/* <View style={styles.statsSection}>
      <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Active Courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1,234</Text>
          <Text style={styles.statLabel}>Total Students</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Avg. Rating</Text>
        </View>
      </View>*/}
      <View style={styles.actionsSection}>
       {/* <TouchableOpacity onPress={() => router.push('/instructor/wallet/add-funds')} style={styles.actionButton}>
          <MaterialCommunityIcons name="cash-plus" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Add Funds</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity onPress={() => router.push('/instructor/wallet/withdraw')}  style={styles.actionButton}>
          <MaterialCommunityIcons name="cash-minus" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  balanceSection: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex:1
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default WalletOverview;
