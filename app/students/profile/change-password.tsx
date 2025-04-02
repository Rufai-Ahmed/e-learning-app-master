import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react-native";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const userToken = useAppSelector((state) => state.user.userLoginToken);

  const validatePassword = (password: string) => {
    const minLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    };
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showAlert("error", "Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("error", "New passwords do not match");
      return;
    }

    const validation = validatePassword(newPassword);
    if (!Object.values(validation).every(Boolean)) {
      showAlert("error", "Password does not meet requirements");
      return;
    }

    setLoading(true);
    try {
      const body = {
        password: newPassword,
        confirm_password: confirmPassword,
      };

      await api.changePassword(body, userToken);
      showAlert("success", "Password changed successfully");
      router.back();
    } catch (err) {
      console.error(error);
      if (err.response.data.message) {
        showAlert("error", err.response.data.message);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordRequirement = (label: string, met: boolean) => (
    <View style={styles.requirementItem}>
      {met ? (
        <CheckCircle2 size={16} color="#4CAF50" />
      ) : (
        <AlertCircle size={16} color="#666" />
      )}
      <Text style={[styles.requirementText, met && styles.requirementMet]}>
        {label}
      </Text>
    </View>
  );

  const passwordValidation = validatePassword(newPassword);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#4169E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordInput}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Enter new password"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordInput}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm new password"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.requirements}>
            <Text style={styles.requirementsTitle}>Password Requirements</Text>
            {renderPasswordRequirement(
              "At least 8 characters",
              passwordValidation.minLength
            )}
            {renderPasswordRequirement(
              "One uppercase letter",
              passwordValidation.hasUpperCase
            )}
            {renderPasswordRequirement(
              "One lowercase letter",
              passwordValidation.hasLowerCase
            )}
            {renderPasswordRequirement(
              "One number",
              passwordValidation.hasNumber
            )}
            {renderPasswordRequirement(
              "One special character",
              passwordValidation.hasSpecialChar
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.changeButton,
            (!newPassword || !confirmPassword) && styles.changeButtonDisabled,
          ]}
          onPress={handleChangePassword}
          disabled={!newPassword || !confirmPassword}
        >
          <Text style={styles.changeButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
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
    color: "#1A1A1A",
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  requirements: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#666",
  },
  requirementMet: {
    color: "#4CAF50",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  changeButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  changeButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  changeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
