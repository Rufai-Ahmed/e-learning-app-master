'use client';

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function QuizContent({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartQuiz = () => {
    setModalVisible(true);
  };

  const handleAgree = () => {
    setModalVisible(false);
    navigation.navigate('QuizQuestion', { questionNumber: 1 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intro to Programmatic</Text>
      <Text style={styles.subtitle}>Practice Assignment • 0 QUESTIONS</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Submit your assignment</Text>
        <Text style={styles.infoText}>DUE Jan 1, 1:00 AM GMT+01:00</Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Coursera Honor Code</Text>
            <Text style={styles.modalText}>
              I understand that submitting work that is not my own may result in permanent failure of this course and deactivation of my Coursera account.
            </Text>
            <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
              <Text style={styles.agreeButtonText}>I agree</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.rejectButtonText}>I reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 24,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  startButton: {
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  agreeButton: {
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  rejectButtonText: {
    color: '#4169E1',
    fontSize: 16,
    fontWeight: '600',
  },
});