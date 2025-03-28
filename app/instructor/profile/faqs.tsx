import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react-native';
import { TextInput } from 'react-native-paper';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I create my first course?',
    answer: 'To create your first course, navigate to the "Courses" tab and click the "Create Course" button. Follow the step-by-step guide to set up your course structure, upload content, and set pricing.',
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'What are the requirements for becoming an instructor?',
    answer: 'To become an instructor, you need expertise in your teaching subject, clear communication skills, and the ability to create engaging content. You should also have a professional bio and verify your identity.',
  },
  {
    id: '3',
    category: 'Course Creation',
    question: 'What types of content can I include in my courses?',
    answer: 'You can include video lectures, written materials, quizzes, assignments, downloadable resources, and interactive exercises. All content should be original or properly licensed.',
  },
  {
    id: '4',
    category: 'Course Creation',
    question: 'How long should my course videos be?',
    answer: 'We recommend keeping individual video lectures between 5-15 minutes for optimal student engagement. Break longer topics into multiple shorter videos.',
  },
  {
    id: '5',
    category: 'Earnings',
    question: 'How do I get paid for my courses?',
    answer: 'Earnings are processed monthly for all sales from the previous month. You can withdraw your earnings through bank transfer once you reach the minimum withdrawal amount of ₦5,000.',
  },
  {
    id: '6',
    category: 'Earnings',
    question: 'What percentage do I earn from course sales?',
    answer: 'Instructors earn 70% of the course price for each sale. This rate may vary for sales through promotional campaigns or affiliate marketing.',
  },
  {
    id: '7',
    category: 'Support',
    question: 'How can I get help with technical issues?',
    answer: 'You can contact our support team through live chat, email support@example.com, or use the "Report an Issue" feature in your instructor dashboard.',
  },
  {
    id: '8',
    category: 'Support',
    question: 'How do I respond to student questions?',
    answer: 'You can respond to student questions through the Q&A section of your course or through direct messages. We recommend responding within 24-48 hours.',
  },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search FAQs..."
          style={styles.searchInput}
          mode="outlined"
          outlineColor="#E0E0E0"
          activeOutlineColor="#4169E1"
          left={<TextInput.Icon icon={() => <Search size={20} color="#666" />} />}
        />
      </View>

      <ScrollView style={styles.content}>
        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {categoryFaqs.map(faq => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>{faq.question}</Text>
                  {expandedId === faq.id ? (
                    <ChevronUp size={20} color="#666" />
                  ) : (
                    <ChevronDown size={20} color="#666" />
                  )}
                </View>
                {expandedId === faq.id && (
                  <Text style={styles.answer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  faqItem: {
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
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 16,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
}); 