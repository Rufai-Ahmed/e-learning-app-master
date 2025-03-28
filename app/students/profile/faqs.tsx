import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CreditCard,
  HelpCircle,
  UserCircle,
  Settings,
} from 'lucide-react-native';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Courses',
    question: 'How do I enroll in a course?',
    answer: `To enroll in a course, browse the course catalog and click on the course you're interested in. Then click the "Enroll Now" button. If it's a paid course, you'll be directed to the payment screen.`,
  },
  {
    id: '2',
    category: 'Courses',
    question: 'Can I access course content offline?',
    answer: `Yes, you can download course videos and materials for offline viewing through our mobile app. However, you'll need to be online to submit assignments and participate in discussions.`,
  },
  {
    id: '3',
    category: 'Payment',
    question: 'What payment methods are accepted?',
    answer: `We accept various payment methods including credit/debit cards and bank transfers through Paystack. All transactions are secure and processed in Nigerian Naira (₦).`,
  },
  {
    id: '4',
    category: 'Payment',
    question: 'Are there any refunds available?',
    answer: `Yes, we offer a 7-day money-back guarantee for most courses. If you're unsatisfied with your purchase, you can request a refund within 7 days of enrollment.`,
  },
  {
    id: '5',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: `Go to your profile settings and click on "Change Password". You'll need to enter your current password and choose a new one. Make sure it meets our security requirements.`,
  },
  {
    id: '6',
    category: 'Account',
    question: 'Can I change my email address?',
    answer: `Yes, you can change your email address in your account settings. You'll need to verify the new email address before the change takes effect.`,
  },
  {
    id: '7',
    category: 'Technical',
    question: "What should I do if a video won't play?",
    answer: `First, check your internet connection. Try refreshing the page or clearing your browser cache. If the problem persists, try using a different browser or device.`,
  },
  {
    id: '8',
    category: 'Technical',
    question: 'How do I report a technical issue?',
    answer: `You can report technical issues through the "Report Issue" section in your profile. Please provide as much detail as possible about the problem you're experiencing.`,
  },
];

const categories = [
  { name: 'Courses', icon: BookOpen, color: '#4169E1' },
  { name: 'Payment', icon: CreditCard, color: '#4CAF50' },
  { name: 'Account', icon: UserCircle, color: '#FF9800' },
  { name: 'Technical', icon: Settings, color: '#9C27B0' },
];

export default function FAQScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderFAQItem = useCallback(
    ({ id, question, answer, category }: FAQ) => {
      const categoryData = categories.find(c => c.name === category);
      const color = categoryData?.color || '#4169E1';

      return (
        <TouchableOpacity
          key={id}
          style={[
            styles.faqItem,
            expandedId === id && styles.faqItemExpanded,
          ]}
          onPress={() => toggleExpand(id)}
          activeOpacity={0.7}
        >
          <View style={styles.faqHeader}>
            <View style={styles.faqTitleContainer}>
              <View style={[styles.categoryDot, { backgroundColor: color }]} />
              <Text style={styles.question}>{question}</Text>
            </View>
            {expandedId === id ? (
              <ChevronUp size={20} color={color} />
            ) : (
              <ChevronDown size={20} color="#666" />
            )}
          </View>
          {expandedId === id && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{answer}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [expandedId]
  );

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
        <View style={styles.searchBox}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === null && styles.categoryChipSelected,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <HelpCircle size={20} color={selectedCategory === null ? '#4169E1' : '#666'} />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === null && styles.categoryTextSelected,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryChip,
              selectedCategory === category.name && styles.categoryChipSelected,
              { borderColor: category.color },
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <category.icon
              size={20}
              color={selectedCategory === category.name ? category.color : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && { color: category.color },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(renderFAQItem)
          ) : (
            <View style={styles.noResults}>
              <HelpCircle size={40} color="#ccc" />
              <Text style={styles.noResultsTitle}>No FAQs Found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search or category filter
              </Text>
            </View>
          )}
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 32,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipSelected: {
    backgroundColor: '#F8F9FF',
    borderColor: '#4169E1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextSelected: {
    color: '#4169E1',
  },
  content: {
    flex: 1,
  },
  faqList: {
    padding: 16,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  faqItemExpanded: {
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 16,
  },
  answerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answer: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  noResults: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 