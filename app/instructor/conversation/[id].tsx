import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Paperclip } from 'lucide-react-native';

type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: 'instructor' | 'student';
};

type Student = {
  id: string;
  name: string;
  avatar: string | null;
  status: 'online' | 'offline';
  lastSeen?: string;
};

// Dummy data for demonstration
const dummyStudent: Student = {
  id: '1',
  name: 'John Doe',
  avatar: null,
  status: 'online',
};

const dummyMessages: Message[] = [
  {
    id: '1',
    text: 'Hi professor, I have a question about the React Native module',
    timestamp: '10:30 AM',
    sender: 'student',
  },
  {
    id: '2',
    text: 'Sure, what would you like to know?',
    timestamp: '10:31 AM',
    sender: 'instructor',
  },
  {
    id: '3',
    text: 'I\'m having trouble understanding the navigation system',
    timestamp: '10:32 AM',
    sender: 'student',
  },
  {
    id: '4',
    text: 'The navigation in React Native works similar to web navigation. Let me explain...',
    timestamp: '10:33 AM',
    sender: 'instructor',
  },
];

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  // In a real app, fetch student and messages data based on id
  const student = dummyStudent;

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'instructor',
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd();
      }, 100);
    }
  };

  const renderMessage = ({ item: message }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      message.sender === 'instructor' ? styles.sentMessage : styles.receivedMessage
    ]}>
      <View style={[
        styles.messageBubble,
        message.sender === 'instructor' ? styles.sentBubble : styles.receivedBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.sender === 'instructor' ? styles.sentText : styles.receivedText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.messageTimestamp,
          message.sender === 'instructor' ? styles.sentTimestamp : styles.receivedTimestamp
        ]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
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
        
        <View style={styles.studentInfo}>
          <View style={styles.avatarContainer}>
            {student.avatar ? (
              <Image source={{ uri: student.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <View style={[
              styles.statusIndicator,
              student.status === 'online' ? styles.onlineIndicator : styles.offlineIndicator
            ]} />
          </View>
          <View>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.statusText}>
              {student.status === 'online' ? 'Online' : `Last seen ${student.lastSeen}`}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={message => message.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send size={24} color={newMessage.trim() ? '#4169E1' : '#666'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  onlineIndicator: {
    backgroundColor: '#4CAF50',
  },
  offlineIndicator: {
    backgroundColor: '#666',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  sentBubble: {
    backgroundColor: '#4169E1',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentText: {
    color: 'white',
  },
  receivedText: {
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  receivedTimestamp: {
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
}); 