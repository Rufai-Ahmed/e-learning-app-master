import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import ModuleProgress from './CourseLearningModules';
import WeekList from './CourseLearningWeekList';
import { router } from 'expo-router';


const { width } = Dimensions.get('window');


const weekData = {
  1: {
    videos: [
      { id: '1.3', title: 'Advertising Analytics', duration: '20 min', type: 'Video' },
      { id: '1.4', title: 'Impressions, Reach & CPM', duration: '9 min', type: 'Video' },
      { id: '1.6', title: 'Cost Per Actions', duration: '38 min', type: 'Video' },
      { id: '1.7', title: 'Cost Per Action Analytics', duration: '24 min', type: 'Video' },
    ],
    quiz: { id: '1.1', title: 'Week 1 Quiz', duration: '30 min' }
  },
  2: {
    videos: [
      { id: '2.1', title: 'Introduction to Programmatic', duration: '15 min', type: 'Video' },
      { id: '2.2', title: 'Programmatic Buying Process', duration: '22 min', type: 'Video' },
    ],
    quiz: { id: '2.1', title: 'Week 2 Quiz', duration: '25 min' }
  },
  3: {
    videos: [
      { id: '3.1', title: 'Digital Marketing Strategy', duration: '25 min', type: 'Video' },
      { id: '3.2', title: 'Campaign Planning', duration: '30 min', type: 'Video' },
    ],
    quiz: { id: '3.1', title: 'Week 3 Quiz', duration: '20 min' }
  }
};


export default function HomeContent({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeWeek, setActiveWeek] = useState(1);

 
  return (
 
 <View style={styles.container}>
        <View style={styles.weeksContainer}>
                  <View style={styles.weekSelector}>
                    {[1, 2, 3, 4, 5].map((week) => (
                      <TouchableOpacity
                        key={week}
                        style={[
                          styles.weekItem,
                          activeWeek === week && styles.activeWeekItem,
                          week > 3 && styles.lockedWeek
                        ]}
                        onPress={() => setActiveWeek(week)}
                        disabled={week > 3}
                      >
                        <Text style={[
                          styles.weekNumber,
                          activeWeek === week && styles.activeWeekNumber
                        ]}>
                          {week}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
      
                  {weekData[activeWeek] && (
                    <View style={styles.weekContent}>
                      <Text style={styles.weekTitle}>Week {activeWeek} Content</Text>
                      
                      <View style={styles.contentSection}>
                        <Text style={styles.sectionTitle}>Videos</Text>
                        {weekData[activeWeek].videos.map((video) => (
                          <TouchableOpacity
                            key={video.id}
                            style={styles.contentItem}
                            onPress={() => router.navigate('/students/course-learning-video')}
                          >
                            <View style={styles.contentItemLeft}>
                              <Text style={styles.contentItemTitle}>{video.title}</Text>
                              <Text style={styles.contentItemMeta}>{video.type} • {video.duration}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
      
                      <View style={styles.contentSection}>
                        <Text style={styles.sectionTitle}>Quiz</Text>
                        <TouchableOpacity
                          style={styles.contentItem}
                          onPress={() => navigation.navigate('Quiz', { quiz: weekData[activeWeek].quiz })}
                        >
                          <View style={styles.contentItemLeft}>
                            <Text style={styles.contentItemTitle}>{weekData[activeWeek].quiz.title}</Text>
                            <Text style={styles.contentItemMeta}>Quiz • {weekData[activeWeek].quiz.duration}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    
    backgroundColor: '#FFFFFF',
  },
  tabsContainer: {
    backgroundColor: '#4169E1',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 4,
    borderRadius: 8,
    marginVertical: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#4169E1',
  },
  content: {
    flex: 1,
  },
  weeksContainer: {
    padding: 20,
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  weekItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4169E1',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeWeekItem: {
    backgroundColor: '#4169E1',
  },
  lockedWeek: {
    borderColor: '#E5E5E5',
    backgroundColor: '#F5F5F5',
  },
  weekNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  activeWeekNumber: {
    color: '#FFFFFF',
  },
  weekContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weekTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  contentItemLeft: {
    flex: 1,
  },
  contentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  contentItemMeta: {
    fontSize: 14,
    color: '#666666',
  },
});