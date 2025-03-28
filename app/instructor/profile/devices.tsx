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
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  MapPin,
  X,
} from 'lucide-react-native';

type Device = {
  id: string;
  name: string;
  type: 'mobile' | 'tablet' | 'desktop';
  lastActive: string;
  location: string;
  isCurrentDevice: boolean;
};

export default function DevicesScreen() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 13 Pro',
      type: 'mobile',
      lastActive: 'Now',
      location: 'Lagos, Nigeria',
      isCurrentDevice: true,
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: '2 hours ago',
      location: 'Lagos, Nigeria',
      isCurrentDevice: false,
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastActive: '3 days ago',
      location: 'Abuja, Nigeria',
      isCurrentDevice: false,
    },
  ]);

  const handleRemoveDevice = (deviceId: string) => {
    Alert.alert(
      'Remove Device',
      'Are you sure you want to remove this device?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDevices(devices.filter(device => device.id !== deviceId));
          },
        },
      ],
    );
  };

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'mobile':
        return <Smartphone size={24} color="#4169E1" />;
      case 'tablet':
        return <Tablet size={24} color="#FF9800" />;
      case 'desktop':
        return <Laptop size={24} color="#4CAF50" />;
    }
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
        <Text style={styles.headerTitle}>Connected Devices</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Devices</Text>
          <Text style={styles.sectionDescription}>
            Manage devices that are signed in to your account
          </Text>
        </View>

        <View style={styles.devicesList}>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.deviceInfo}>
                {getDeviceIcon(device.type)}
                <View style={styles.deviceDetails}>
                  <View style={styles.deviceHeader}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    {device.isCurrentDevice && (
                      <View style={styles.currentDevice}>
                        <Text style={styles.currentDeviceText}>
                          Current Device
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.deviceMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={16} color="#666" />
                      <Text style={styles.metaText}>{device.lastActive}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <MapPin size={16} color="#666" />
                      <Text style={styles.metaText}>{device.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {!device.isCurrentDevice && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveDevice(device.id)}
                >
                  <X size={20} color="#FF4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Device Security</Text>
          <Text style={styles.infoText}>
            For security reasons, you'll be asked to verify your identity if you sign in from a new device or browser.
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
  },
  devicesList: {
    paddingHorizontal: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  currentDevice: {
    backgroundColor: '#EBF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentDeviceText: {
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '500',
  },
  deviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
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