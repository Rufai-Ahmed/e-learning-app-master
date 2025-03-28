import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Edit2, Trash2, X, MoreVertical } from 'lucide-react-native';
import { CourseCard } from '@/components/ui/CourseLearningCard';
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from '@/lib/actions/api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useFocusEffect } from '@react-navigation/native';
import { getInstructorCourses } from "@/lib/reducers/storeInstructorCourses";
import {router} from "expo-router"

type Course = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string[];
  level: string;
  status: string;
};

export default function ManageCoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedCategory, setEditedCategory] = useState<string[]>([]);
  const [editedLevel, setEditedLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const userData = useAppSelector(state => state.user.user);
  const userToken = useAppSelector(state => state.user.userLoginToken);
  const dispatch = useAppDispatch();
  const courses = useAppSelector(state => state.instructorCourses.courses);

  
  useFocusEffect(
    useCallback(() => {
      fetchInstructorCourses()
    },[])
    )

const fetchInstructorCourses = async () => {
  try{
    setLoading(true)
    const res = await api.getInstructorCourses(userData?.id, userToken)
    
  dispatch(getInstructorCourses(res.data))
  }
  catch(err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }
}
  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditedName(course.name);
    setEditedDescription(course.description);
    setEditedPrice(course.price.toString());
    setEditedCategory(course.category);
    setEditedLevel(course.level);
    setIsEditModalVisible(true);
  };

  const handleDeleteCourse = async (courseId: number) => {
    
    try {
      
      Alert.alert(
        "Delete Course",
        "Are you sure you want to delete this course?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
            try{
              setLoading(true)
              await api.deleteCourse(courseId, userToken);
          /*    dispatch(getInstructorCourses(courses.filter(course => course.id
          !== courseId)));*/
              showAlert('success', 'Course deleted successfully');
            }
            catch(err){
              console.log(err.response.data)
            }
            finally{
              setLoading(false)
            }
            }
          }
        ]
      );
    } catch (error) {
      console.log(error.response.data)
      showAlert('error', 'Failed to delete course');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (selectedCourse) {
      setLoading(true);
      setIsEditModalVisible(false)
      try {
        const body = {
          name: editedName,
          description: editedDescription,
          price: parseFloat(editedPrice),
          category: editedCategory,
         /// level: editedLevel,
        };
        console.log(body,"body")
        const res = await api.updateCourse(selectedCourse.id, body, userToken);
   
   console.log(res, "update")
   
    /*    dispatch(getInstructorCourses(courses.map(course =>
          course.id === selectedCourse.id ? { ...course, ...body } : course
        )));*/
        showAlert('success', 'Course updated successfully');
      } catch (error) {
        console.log(error.response.data)
        showAlert('error', 'Failed to update course');
      } finally {
        setLoading(false);
        setIsEditModalVisible(false);
        setSelectedCourse(null);
      }
    }
  };

  const CourseManagementCard = ({ course }: { course: Course }) => (
    <View style={styles.courseManagementCard}>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>Title: {course.name}</Text>
        <Text style={styles.courseDescription}>Description: {course.description}</Text>
        <Text style={styles.courseInfo}>Price: ${course.price}</Text>
        <Text
        style={styles.courseInfo}>Categories:{course?.category?.join(",")}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditCourse(course)}
        >
          <Edit2 size={20} color="#4169E1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteCourse(course.id)}
        >
          <Trash2 size={20} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Courses</Text>
        <TouchableOpacity>
          <Settings size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
{courses?.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No courses found</Text>
    <TouchableOpacity 
      style={styles.createButton} 
      onPress={() => router.navigate('/instructor/(tabs)/add-course')}
    >
      <Text style={styles.createButtonText}>Create Course</Text>
    </TouchableOpacity>
  </View>
) : (
  <ScrollView style={styles.content}>
    {courses?.map((course) => (
      <CourseManagementCard key={course.id} course={course} />
    ))}
  </ScrollView>
)}
      </ScrollView>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Course</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Course Name</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Enter course name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Enter course description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.input}
                value={editedPrice}
                onChangeText={(text) => {
                  const regex = /^\d*\.?\d*$/;
                  if (regex.test(text) || text === "") {
                    setEditedPrice(text);
                  }
                }}
                placeholder="Enter course price"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Level</Text>
              <TextInput
                style={styles.input}
                value={editedLevel}
                onChangeText={setEditedLevel}
                placeholder="Enter course level"
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseManagementCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseContent: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  courseInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4169E1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
emptyText: {
  fontSize: 18,
  color: '#666',
  marginBottom: 16,
},
createButton: {
  backgroundColor: '#4169E1',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
},
createButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},
});
