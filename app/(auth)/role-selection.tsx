import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GraduationCap, PersonStanding } from 'lucide-react-native';
import { router } from 'expo-router';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = React.useState<'student' | 'instructor' | null>(null);

  const handleContinue = () => {
    if (selectedRole  === 'instructor') {
      console.log(true)
      router.navigate('/instructor/(auth)/social-auth');
    }
    else{
      console.log(false)
        router.navigate('/students/(auth)/social-auth');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Select how you want to use the platform</Text>

      <TouchableOpacity
        style={[
          styles.roleCard,
          selectedRole === 'student' && styles.selectedCard
        ]}
        onPress={() => setSelectedRole('student')}
      >
        <GraduationCap size={40} color={selectedRole === 'student' ? '#4169E1' : '#000000'} />
        <View style={styles.roleInfo}>
          <Text style={[
            styles.roleTitle,
            selectedRole === 'student' && styles.selectedText
          ]}>
            Student
          </Text>
          <Text style={styles.roleDescription}>
            Access courses and learn from expert instructors
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleCard,
          selectedRole === 'instructor' && styles.selectedCard
        ]}
        onPress={() => setSelectedRole('instructor')}
      >
        <PersonStanding size={40} color={selectedRole === 'instructor' ? '#4169E1' : '#000000'} />
        <View style={styles.roleInfo}>
          <Text style={[
            styles.roleTitle,
            selectedRole === 'instructor' && styles.selectedText
          ]}>
            Instructor
          </Text>
          <Text style={styles.roleDescription}>
            Create courses and share your knowledge
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !selectedRole && styles.buttonDisabled
        ]}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    borderColor: '#4169E1',
    backgroundColor: '#F0F8FF',
  },
  roleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  selectedText: {
    color: '#4169E1',
  },
  roleDescription: {
    fontSize: 14,
    color: '#666666',
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;