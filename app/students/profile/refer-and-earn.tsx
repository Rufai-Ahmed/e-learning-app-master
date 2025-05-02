import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gift } from "lucide-react-native";

export default function ReferAndEarnScreen() {
  // Static/dummy values for demonstration; replace with real data when available.
  const referralCode = "A1SCHOOL123";
  const commissionRate = "10%"; // Commission per successful enrollment
  const totalEarnings = "₦0.00"; // Total commission earned so far
  const referralsCount = 0; // Number of successful referrals

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join A1School using my referral code ${referralCode} and earn commission on every enrollment! Earn ${commissionRate} commission on each successful enrollment.`,
      });
    } catch (error) {
      console.error("Error sharing referral code:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Gift size={32} color="#FFD700" />
        <Text style={styles.headerTitle}>Refer & Earn</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Invite your friends to join A1School, the premier platform for quality learning, and earn commission on every successful course enrollment!
        </Text>

        <View style={styles.referralContainer}>
          <Text style={styles.referralLabel}>Your Referral Code</Text>
          <View style={styles.codeBox}>
            <Text style={styles.referralCode}>{referralCode}</Text>
          </View>
        </View>

        <View style={styles.commissionContainer}>
          <Text style={styles.commissionTitle}>Commission Details</Text>
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Commission Rate:</Text>
            <Text style={styles.commissionValue}>{commissionRate}</Text>
          </View>
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Total Earnings:</Text>
            <Text style={styles.commissionValue}>{totalEarnings}</Text>
          </View>
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Successful Referrals:</Text>
            <Text style={styles.commissionValue}>{referralsCount}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F7F9FC", 
    padding: 16 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 24 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginLeft: 8 
  },
  content: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 16 
  },
  description: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#666", 
    marginBottom: 32 
  },
  referralContainer: { 
    alignItems: "center", 
    marginBottom: 32 
  },
  referralLabel: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1A1A1A", 
    marginBottom: 8 
  },
  codeBox: { 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 8, 
    elevation: 2 
  },
  referralCode: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#4169E1" 
  },
  commissionContainer: { 
    width: "100%", 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 8, 
    elevation: 2, 
    marginBottom: 32 
  },
  commissionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginBottom: 12, 
    textAlign: "center" 
  },
  commissionRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginVertical: 4 
  },
  commissionLabel: { 
    fontSize: 16, 
    color: "#555" 
  },
  commissionValue: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#4169E1" 
  },
  shareButton: { 
    backgroundColor: "#4169E1", 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 8 
  },
  shareButtonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});
