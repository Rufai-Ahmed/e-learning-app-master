import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const sections = [
  {
    title: '1. Account Terms',
    content: `As a student on our platform, you agree to:
• Provide accurate personal information
• Maintain the security of your account
• Not share your account credentials
• Be at least 13 years old to create an account
• Comply with all applicable laws and regulations`,
  },
  {
    title: '2. Course Enrollment',
    content: `When enrolling in courses:
• You gain access to course content upon successful payment
• Course access is for personal use only
• You cannot share or resell course materials
• Refunds are available within 30 days of purchase
• Course certificates are non-transferable`,
  },
  {
    title: '3. Payment Terms',
    content: `Regarding payments:
• All prices are in Nigerian Naira (₦)
• Payments are processed securely through our partners
• We accept various payment methods
• Refunds are processed to original payment method
• Some courses may have subscription fees`,
  },
  {
    title: '4. Course Access',
    content: `Your course access includes:
• All course materials as advertised
• Lifetime access to purchased courses
• Course updates when available
• Access to course discussions
• Instructor support as specified`,
  },
  {
    title: '5. Student Conduct',
    content: `You agree to:
• Respect intellectual property rights
• Maintain appropriate behavior in discussions
• Not share course materials
• Complete your own assignments
• Not engage in academic dishonesty`,
  },
  {
    title: '6. Platform Rules',
    content: `General platform rules include:
• No harassment or discrimination
• No spamming or inappropriate content
• No unauthorized commercial activity
• No impersonation of others
• No attempts to manipulate the platform`,
  },
  {
    title: '7. Content Usage',
    content: `Regarding course content:
• Materials are for personal use only
• Downloads are permitted for offline learning
• You cannot modify or distribute content
• Some features may require internet connection
• Content availability may vary by region`,
  },
  {
    title: '8. Account Termination',
    content: `Your account may be terminated for:
• Violation of these terms
• Payment disputes
• Fraudulent activity
• Sharing account access
• Multiple policy violations`,
  },
  {
    title: '9. Privacy & Data',
    content: `Regarding your data:
• We protect your personal information
• Learning progress is tracked
• You can request your data
• We use cookies for functionality
• You can control privacy settings`,
  },
  {
    title: '10. Modifications',
    content: `We reserve the right to:
• Update these terms
• Modify course content
• Change platform features
• Adjust pricing
• Update policies

Changes will be communicated via email.`,
  },
];

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <Text style={styles.lastUpdated}>Last Updated: March 1, 2024</Text>
          <Text style={styles.introText}>
            Please read these terms carefully before using our platform as a student.
            By using our services, you agree to be bound by these terms.
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Terms?</Text>
          <Text style={styles.contactText}>
            If you have any questions about these terms, please contact our support team
            at support@example.com
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
  introSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#EBF2FF',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 