import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { api } from "@/lib/actions/api";
import { getUserInfo } from "@/lib/reducers/storeUserInfo";

const ProfileSettingsScreen = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.user);
  const [profilePicture, setProfilePicture] = useState(userData?.image_link);

  const convertUriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handleUpdatePicture = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (pickerResult.canceled) return;

    setProfilePicture(pickerResult.assets[0].uri);

    try {
      const fileUri = pickerResult.assets[0].uri;
      const fileName = fileUri.split("/").pop() || "photo.jpg";
      const fileType = fileUri.split(".").pop()?.toLowerCase() || "jpeg";

      const blob = await convertUriToBlob(fileUri);

      const formData = new FormData();
      formData.append("image", blob, fileName);

      const res = await api.uploadUserImage(userData?.id, userToken, formData);
      dispatch(getUserInfo(res?.data));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.logoutUser(userData?.id, userToken); // Simulate network delay
      showAlert("success", "Logged out successfully");
      dispatch(getUserInfo(null));
      router.push("/");
    } catch (error) {
      console.error(error);
      if (err.response?.data.message) {
        showAlert("error", err.response?.data.message);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Failed to log out. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <Text></Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={handleUpdatePicture}>
            <Image source={{ uri: profilePicture }} style={styles?.avatar} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData?.fullname}</Text>
            <Text style={styles.profileEmail}>{userData?.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.navigate("/students/profile/account")}
          >
            <Feather
              name="edit-2"
              size={20}
              color="#fff"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.navigate("/students/profile/change-password")}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#1976d2" }]}>
              <Feather name="lock" size={20} color="#fff" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Change Password</Text>
              <Text style={styles.rowSubtitle}>Update your password</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.navigate("/students/profile/language")}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#1976d2" }]}>
              <Feather name="globe" size={20} color="#fff" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Language</Text>
              <Text style={styles.rowSubtitle}>English (US)</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.navigate("/students/profile/notifications")}
          >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.rowIcon, { backgroundColor: "#1976d2" }]}>
                  <Feather name="bell" size={20} color="#fff" />
                </View>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Notifications</Text>
                  <Text style={styles.rowSubtitle}>Push notifications</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.navigate("")}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#1976d2" }]}>
              <Feather name="info" size={20} color="#fff" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>About App</Text>
              <Text style={styles.rowSubtitle}>Version 1.0.0</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd", // light blue background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1976d2", // blue theme colour
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  profileEmail: {
    fontSize: 14,
    color: "#e3f2fd",
    marginTop: 4,
  },
  editIcon: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  sectionHeader: {
    fontSize: 12,
    color: "#1976d2",
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  signOutText: {
    fontSize: 16,
    color: "#d32f2f",
    fontWeight: "600",
  },
});

export default ProfileSettingsScreen;
