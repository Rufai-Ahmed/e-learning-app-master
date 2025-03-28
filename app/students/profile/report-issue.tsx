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
  AlertTriangle,
  Image as ImageIcon,
  X,
  Send,
} from 'lucide-react-native';
import { TextInput, Chip } from 'react-native-paper';

type IssueCategory = 'technical' | 'course' | 'payment' | 'account' | 'other';

interface IssueDetails {
  category: IssueCategory;
  title: string;
  description: string;
  attachments: string[];
}

const categories: { value: IssueCategory; label: string; color: string }[] = [
  { value: 'technical', label: 'Technical Issue', color: '#FF4444' },
  { value: 'course', label: 'Course Problem', color: '#4169E1' },
  { value: 'payment', label: 'Payment Issue', color: '#4CAF50' },
  { value: 'account', label: 'Account Issue', color: '#FF9800' },
  { value: 'other', label: 'Other', color: '#9C27B0' },
];

export default function ReportIssueScreen() {
  const [issueDetails, setIssueDetails] = useState<IssueDetails>({
    category: 'technical',
    title: '',
    description: '',
    attachments: [],
  });

  const handleSubmit = () => {
    if (!issueDetails.title.trim()) {
      Alert.alert('Error', 'Please enter an issue title');
      return;
    }

    if (!issueDetails.description.trim()) {
      Alert.alert('Error', 'Please describe the issue');
      return;
    }

    // In a real app, send the issue details to your backend
    Alert.alert(
      'Issue Reported',
      'Thank you for reporting this issue. Our team will review it and respond within 24 hours.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleAddAttachment = () => {
    // Implement image/file picker
    Alert.alert('Coming Soon', 'File attachment feature will be available soon.');
  };

  const handleRemoveAttachment = (index: number) => {
    setIssueDetails(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
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
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.value}
                onPress={() => setIssueDetails(prev => ({ ...prev, category: category.value }))}
              >
                <Chip
                  selected={issueDetails.category === category.value}
                  selectedColor={category.color}
                  style={[
                    styles.categoryChip,
                    issueDetails.category === category.value && {
                      backgroundColor: `${category.color}20`,
                    },
                  ]}
                >
                  {category.label}
                </Chip>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Issue Title</Text>
          <TextInput
            value={issueDetails.title}
            onChangeText={title => setIssueDetails(prev => ({ ...prev, title }))}
            placeholder="Brief description of the issue"
            style={styles.input}
            mode="outlined"
            outlineColor="#E0E0E0"
            activeOutlineColor="#4169E1"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={issueDetails.description}
            onChangeText={description =>
              setIssueDetails(prev => ({ ...prev, description }))
            }
            placeholder="Please provide detailed information about the issue..."
            style={styles.textArea}
            mode="outlined"
            outlineColor="#E0E0E0"
            activeOutlineColor="#4169E1"
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Attachments</Text>
          <TouchableOpacity
            style={styles.attachmentButton}
            onPress={handleAddAttachment}
          >
            <ImageIcon size={24} color="#4169E1" />
            <Text style={styles.attachmentButtonText}>
              Add Screenshots or Files
            </Text>
          </TouchableOpacity>

          {issueDetails.attachments.map((attachment, index) => (
            <View key={index} style={styles.attachmentItem}>
              <Text style={styles.attachmentName} numberOfLines={1}>
                {attachment}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveAttachment(index)}
                style={styles.removeAttachment}
              >
                <X size={20} color="#FF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <AlertTriangle size={20} color="#666" />
          <Text style={styles.infoText}>
            Our support team typically responds within 24 hours. For urgent issues,
            please use the live chat feature.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!issueDetails.title || !issueDetails.description) &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!issueDetails.title || !issueDetails.description}
        >
          <Send size={20} color="white" />
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  categoriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
  },
  textArea: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#4169E1',
    borderRadius: 8,
    backgroundColor: '#EBF2FF',
  },
  attachmentButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  attachmentName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  removeAttachment: {
    padding: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 