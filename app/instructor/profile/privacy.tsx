import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Smartphone,
  Key,
  Fingerprint,
  AlertTriangle,
} from 'lucide-react-native';

export default function PrivacyScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  const [emailVisible, setEmailVisible] = useState(false);

  const handleChangePassword = () => {
    // Implement password change logic
    router.push('/instructor/profile/change-password');
  };

  const handleDevices = () => {
    // Implement device management
    router.push('/instructor/profile/devices');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Implement account deletion logic
          },
        },
      ],
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Settings</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleChangePassword}
            >
              <View style={styles.settingInfo}>
                <Lock size={24} color="#4169E1" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Change Password</Text>
                  <Text style={styles.settingDescription}>
                    Update your account password
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Key size={24} color="#4CAF50" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
                  <Text style={styles.settingDescription}>
                    Add an extra layer of security
                  </Text>
                </View>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: '#E5E9F0', true: '#4169E1' }}
                thumbColor="white"
              />
            </View> */}
{/* 
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Fingerprint size={24} color="#FF9800" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Biometric Login</Text>
                  <Text style={styles.settingDescription}>
                    Use fingerprint or face recognition
                  </Text>
                </View>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#E5E9F0', true: '#4169E1' }}
                thumbColor="white"
              />
            </View>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleDevices}
            >
              <View style={styles.settingInfo}>
                <Smartphone size={24} color="#9C27B0" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Manage Devices</Text>
                  <Text style={styles.settingDescription}>
                    View and control connected devices
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.card}>
            {/* <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Eye size={24} color="#4169E1" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Activity Status</Text>
                  <Text style={styles.settingDescription}>
                    Show when you're active on the platform
                  </Text>
                </View>
              </View>
              <Switch
                value={activityVisible}
                onValueChange={setActivityVisible}
                trackColor={{ false: '#E5E9F0', true: '#4169E1' }}
                thumbColor="white"
              />
            </View> */}
{/* 
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield size={24} color="#4CAF50" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Email Privacy</Text>
                  <Text style={styles.settingDescription}>
                    Show email address to students
                  </Text>
                </View>
              </View>
              <Switch
                value={emailVisible}
                onValueChange={setEmailVisible}
                trackColor={{ false: '#E5E9F0', true: '#4169E1' }}
                thumbColor="white"
              />
            </View> 
          </View>
        </View> */}

        <View style={styles.dangerSection}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <AlertTriangle size={24} color="#FF4444" />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
          <Text style={styles.dangerText}>
            Permanently delete your account and all associated data
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  dangerSection: {
    padding: 16,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
  },
  dangerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
}); 