import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  Mail,
  FileText,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Youtube,
} from 'lucide-react-native';

type SupportSection = {
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
  }[];
};

export default function SupportScreen() {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const handleOpenChat = () => {
    // Implement live chat
    router.push('/students/profile/support/tawk');

  };

  const handleOpenGuides = () => {
    // Navigate to learning guides
    router.push('/students/guides');
  };

  const handleOpenVideos = () => {
    // Navigate to tutorial videos
    router.push('/students/tutorials');
  };

  const supportSections: SupportSection[] = [
    {
      title: 'Get Help',
      items: [
        {
          id: 'chat',
          title: 'Live Chat Support',
          description: 'Chat with our support team',
          icon: <MessageSquare size={24} color="#4169E1" />,
          action: handleOpenChat,
        },
        {
          id: 'email',
          title: 'Email Support',
          description: 'Send us an email',
          icon: <Mail size={24} color="#4CAF50" />,
          action: handleContactSupport,
        },
      ],
    },
    {
      title: 'Self Help',
      items: [
        // {
        //   id: 'guides',
        //   title: 'Learning Guides',
        //   description: 'Learn how to get the most from your courses',
        //   icon: <BookOpen size={24} color="#FF9800" />,
        //   action: handleOpenGuides,
        // },
        // {
        //   id: 'tutorials',
        //   title: 'Video Tutorials',
        //   description: 'Watch platform tutorial videos',
        //   icon: <Youtube size={24} color="#FF4444" />,
        //   action: handleOpenVideos,
        // },
        {
          id: 'faq',
          title: 'FAQs',
          description: 'Find answers to common questions',
          icon: <HelpCircle size={24} color="#9C27B0" />,
          action: () => router.push('/students/profile/faqs'),
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'Read our terms of service',
          icon: <FileText size={24} color="#607D8B" />,
          action: () => router.push('/students/profile/terms'),
        },
        {
          id: 'report',
          title: 'Report an Issue',
          description: 'Report technical issues or bugs',
          icon: <AlertTriangle size={24} color="#FF4444" />,
          action: () => router.push('/students/profile/report-issue'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {supportSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.supportItem}
                  onPress={item.action}
                >
                  <View style={styles.supportInfo}>
                    {item.icon}
                    <View style={styles.supportText}>
                      <Text style={styles.supportTitle}>{item.title}</Text>
                      <Text style={styles.supportDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.infoBox}>
          <HelpCircle size={20} color="#666" />
          <Text style={styles.infoText}>
            Our support team is available 24/7 to help you with any questions or issues you may have.
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
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  supportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  supportText: {
    marginLeft: 12,
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
}); 