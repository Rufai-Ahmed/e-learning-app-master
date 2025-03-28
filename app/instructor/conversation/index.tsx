import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageCircle } from 'lucide-react-native';
import { router } from 'expo-router';

type ConversationPreview = {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string | null;
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    sender: 'instructor' | 'student';
  };
  unreadCount: number;
  studentStatus: 'online' | 'offline';
  lastSeen?: string;
};

// Dummy data for demonstration
const dummyConversations: ConversationPreview[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Doe',
    studentAvatar: null,
    lastMessage: {
      text: 'I have a question about the React Native module',
      timestamp: '2 min ago',
      isRead: false,
      sender: 'student',
    },
    unreadCount: 2,
    studentStatus: 'online',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Jane Smith',
    studentAvatar: null,
    lastMessage: {
      text: 'Thank you for the clarification!',
      timestamp: '1 hour ago',
      isRead: true,
      sender: 'student',
    },
    unreadCount: 0,
    studentStatus: 'offline',
    lastSeen: '2 hours ago',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Mike Johnson',
    studentAvatar: null,
    lastMessage: {
      text: "Yes, I will review your assignment and provide feedback soon.",
      timestamp: '2 hours ago',
      isRead: true,
      sender: 'instructor',
    },
    unreadCount: 0,
    studentStatus: 'offline',
    lastSeen: '3 hours ago',
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Sarah Williams',
    studentAvatar: null,
    lastMessage: {
      text: 'When is the next live session scheduled?',
      timestamp: 'Yesterday',
      isRead: false,
      sender: 'student',
    },
    unreadCount: 1,
    studentStatus: 'online',
  },
];

export default function ConversationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<ConversationPreview[]>(dummyConversations);

  const filteredConversations = conversations.filter(conversation =>
    conversation.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({ item: conversation }: { item: ConversationPreview }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => router.push({
        pathname: "/instructor/conversation/[id]",
        params: { id: conversation.studentId }
      })}
    >
      <View style={styles.avatarContainer}>
        {conversation.studentAvatar ? (
          <Image source={{ uri: conversation.studentAvatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {conversation.studentName.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        )}
        {conversation.studentStatus === 'online' && (
          <View style={styles.onlineIndicator} />
        )}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.studentName}>{conversation.studentName}</Text>
          <Text style={styles.timestamp}>{conversation.lastMessage.timestamp}</Text>
        </View>

        <View style={styles.messagePreview}>
          <Text 
            style={[
              styles.lastMessage,
              !conversation.lastMessage.isRead && styles.unreadMessage
            ]}
            numberOfLines={2}
          >
            {conversation.lastMessage.sender === 'instructor' && 'You: '}
            {conversation.lastMessage.text}
          </Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MessageCircle size={24} color="#4169E1" />
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={conversation => conversation.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No conversations found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4169E1',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#4169E1',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
});
