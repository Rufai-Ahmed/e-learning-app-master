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
    title: '1. Instructor Eligibility',
    content: `To be eligible as an instructor on our platform, you must:
• Be at least 18 years old
• Provide accurate personal information
• Have expertise in your teaching subject
• Maintain professional conduct
• Comply with all applicable laws and regulations`,
  },
  {
    title: '2. Content Guidelines',
    content: `When creating and uploading course content, you must:
• Create original content or have proper licenses
• Ensure content quality meets our standards
• Not include inappropriate or offensive material
• Respect intellectual property rights
• Keep content up-to-date and accurate`,
  },
  {
    title: '3. Revenue Sharing',
    content: `Our revenue sharing model includes:
• 70% instructor revenue share for course sales
• Monthly payment processing
• Minimum withdrawal amount of ₦5,000
• Payment through approved banking channels
• Potential adjustments for promotional sales`,
  },
  {
    title: '4. Course Pricing',
    content: `When pricing your courses:
• Prices must be set in Nigerian Naira (₦)
• Minimum course price is ₦5,000
• Maximum course price is ₦200,000
• Prices should reflect course value and market standards
• We reserve the right to suggest price adjustments`,
  },
  {
    title: '5. Instructor Obligations',
    content: `As an instructor, you are required to:
• Respond to student questions within 48 hours
• Maintain course content quality
• Provide accurate course descriptions
• Update course materials as needed
• Participate in student discussions`,
  },
  {
    title: '6. Platform Rules',
    content: `You must follow these platform rules:
• No spamming or inappropriate marketing
• No harassment or discrimination
• No sharing of student personal information
• No promotion of external websites without approval
• No manipulation of reviews or ratings`,
  },
  {
    title: '7. Content Ownership',
    content: `Regarding content ownership:
• You retain ownership of your content
• We receive a license to host and promote it
• You can remove content with 30 days notice
• Students retain access to purchased courses
• We may feature your content in marketing`,
  },
  {
    title: '8. Account Termination',
    content: `We may terminate accounts for:
• Violation of these terms
• Extended inactivity
• Fraudulent activity
• Multiple policy violations
• Legal requirements`,
  },
  {
    title: '9. Privacy and Data',
    content: `Regarding privacy and data:
• We protect your personal information
• You must protect student data
• We collect usage analytics
• We comply with privacy laws
• You can request your data`,
  },
  {
    title: '10. Modifications',
    content: `We reserve the right to:
• Modify these terms
• Change revenue sharing terms
• Update platform features
• Adjust pricing guidelines
• Modify content requirements

Changes will be communicated with 30 days notice.`,
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
            Please read these terms carefully before using our platform as an instructor.
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