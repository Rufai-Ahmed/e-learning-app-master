import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  Globe,
  BookOpen,
  Save,
  GraduationCap,
} from "lucide-react-native";
import { useAppSelector } from "@/hooks/useAppSelector";

type AccountDetails = {
  name: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  interests: string[];
  education: string;
  avatar: string | null;
};

const dummyAccount: AccountDetails = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+234 123 456 7890",
  website: "www.johnsmith.com",
  bio: "Passionate learner interested in web development and mobile app development.",
  interests: ["Web Development", "Mobile Apps", "UI/UX Design"],
  education: "Computer Science Student",
  avatar: null,
};

export default function AccountScreen() {
  const [account, setAccount] = useState<AccountDetails>(dummyAccount);
  const [isEditing, setIsEditing] = useState(false);
  const userData = useAppSelector((state) => state.user.user);

  const handleSave = () => {
    // Implement save logic here
    Alert.alert("Success", "Profile updated successfully");
    setIsEditing(false);
  };

  const handleChangePhoto = () => {
    // Implement photo change logic
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
        <Text style={styles.headerTitle}>Account Settings</Text>
        {/* <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.photoSection}>
          <View style={styles?.avatarContainer}>
            {account?.avatar ? (
              <Image source={{ uri: account?.avatar }} style={styles?.avatar} />
            ) : (
              <View style={[styles?.avatar, styles?.avatarPlaceholder]}>
                <Text style={styles?.avatarText}>
                  {userData?.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            )}
            {isEditing && (
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handleChangePhoto}
              >
                <Camera size={20} color="#4169E1" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData?.fullname}
              onChangeText={(text) => setAccount({ ...account, name: text })}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWithIcon}>
              <Mail size={20} color="#666" />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={userData?.email}
                onChangeText={(text) => setAccount({ ...account, email: text })}
                editable={isEditing}
                keyboardType="email-address"
              />
            </View>
          </View>
          {/* 

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Education</Text>
            <View style={styles.inputWithIcon}>
              <GraduationCap size={20} color="#666" />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={account.education}
                onChangeText={(text) => setAccount({ ...account, education: text })}
                editable={isEditing}
              />
            </View>
          </View> */}
          {/* 
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <View style={styles.inputWithIcon}>
              <Globe size={20} color="#666" />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={account.website}
                onChangeText={(text) => setAccount({ ...account, website: text })}
                editable={isEditing}
                keyboardType="url"
              />
            </View>
          </View> */}
        </View>
      </ScrollView>

      {isEditing && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Save size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: "#4169E1",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "600",
    color: "#4169E1",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  inputDisabled: {
    backgroundColor: "#f8f9fa",
    color: "#666",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  textArea: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
    height: 120,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF2FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  interestText: {
    fontSize: 14,
    color: "#4169E1",
    fontWeight: "500",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#4169E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
