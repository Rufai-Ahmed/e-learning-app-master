'use client';

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: 1,
    text: 'What is the best way to look at a relationship between two variables in advertising?',
    options: [
      'scatter plots',
      'multiple regression',
      'histograms',
      'distribution plots',
    ],
  },
  {
    id: 2,
    text: 'What is the risk that the advertising platform takes when using CPC?',
    options: [
      'They don\'t know how many times it will take for the ad to be seen to get X clicks.',
      'They can\'t be sure that the advertiser will pay.',
      'They don\'t know if the advertiser has a quality score that warrants the ad running.',
      'They are unable to discern who is running the ad.',
    ],
  },
];

export default function QuizQuestionScreen({ route, navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const questionNumber = route.params?.questionNumber || 1;
  const question = questions[questionNumber - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.questionCount}>Question {questionNumber}/5</Text>
      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(index)}
          >
            <View style={[
              styles.radio,
              selectedOption === index && styles.radioSelected,
            ]} />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navigation}>
        {questionNumber > 1 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('QuizQuestion', { 
              questionNumber: questionNumber - 1 
            })}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() => {
            if (questionNumber < questions?.length) {
              navigation.navigate('QuizQuestion', { 
                questionNumber: questionNumber + 1 
              });
            } else {
              navigation.navigate('Quiz');
            }
          }}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  questionCount: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedOption: {
    borderColor: '#4169E1',
    backgroundColor: '#F8F9FF',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666666',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#4169E1',
    backgroundColor: '#4169E1',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 20,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  nextButton: {
    backgroundColor: '#4169E1',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
  },
});