import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserInfo, getUserLoginToken } from "@/lib/reducers/storeUserInfo";

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, watch } = useForm<FormData>();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Watch password value for real-time validation
  const password = watch("password") || "";

  // Password validation rules
  const passwordRules = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) ||
        "Password must contain at least one uppercase letter",
      hasNumber: (value: string) =>
        /\d/.test(value) || "Password must contain at least one number",
      hasSpecialChar: (value: string) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Password must contain at least one special character",
    },
  };

  // Check password requirements
  const meetsLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const { password, email } = data;

      const body = {
        email: email.toLowerCase().trim(),
        password,
      };

      const res = await api.signinAccount(body);

      const userRole = res?.data?.roles.map(
        (e: { name: string }) => e.name
      )?.[0] as "student" | "instructor";
      const otherRole = res?.data?.roles.map(
        (e: { name: string }) => e.name
      )?.[1] as "student" | "instructor";

      if (userRole  !== "instructor" && otherRole !== 'instructor') {
        console.error({ otherRole, userRole });
        Alert.alert(
          "Error",
          "You're not an instructor. Try logging in as a student."
        );
        return;
      }

      dispatch(getUserInfo(res?.data));
      dispatch(getUserLoginToken(res?.data.token));
      console.log(res, "data");

      showAlert("success", "Account logged in successfully");

      setTimeout(() => {
        router.push({
          pathname: "/instructor/(tabs)",
        });
      }, 500);
    } catch (err: any) {
      console.log(err.response?.data);
      if (err.response?.data.message) {
        showAlert("error", err.response?.data.message);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Error creating your account. Try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient colors={["#4169E1", "#6495ED"]} style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                error={!!error}
                left={
                  <TextInput.Icon
                    icon={() => <Mail size={20} color="#4169E1" />}
                  />
                }
                style={styles.input}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#4169E1"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={passwordRules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  error={!!error}
                  left={
                    <TextInput.Icon
                      icon={() => <Lock size={20} color="#4169E1" />}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() =>
                        showPassword ? (
                          <EyeOff size={20} color="#4169E1" />
                        ) : (
                          <Eye size={20} color="#4169E1" />
                        )
                      }
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                  mode="outlined"
                  outlineColor="#E0E0E0"
                  activeOutlineColor="#4169E1"
                />
                {/* Password Requirements Indicators */}
                <View style={styles.passwordRequirements}>
                  <Text
                    style={[
                      styles.requirementText,
                      meetsLength && styles.requirementMet,
                    ]}
                  >
                    • Minimum 8 characters {meetsLength ? "✓" : "✗"}
                  </Text>
                  <Text
                    style={[
                      styles.requirementText,
                      hasUpperCase && styles.requirementMet,
                    ]}
                  >
                    • Uppercase letter {hasUpperCase ? "✓" : "✗"}
                  </Text>
                  <Text
                    style={[
                      styles.requirementText,
                      hasNumber && styles.requirementMet,
                    ]}
                  >
                    • Number {hasNumber ? "✓" : "✗"}
                  </Text>
                  <Text
                    style={[
                      styles.requirementText,
                      hasSpecialChar && styles.requirementMet,
                    ]}
                  >
                    • Special character {hasSpecialChar ? "✓" : "✗"}
                  </Text>
                </View>
              </>
            )}
          />

          <TouchableOpacity
            onPress={() => router.navigate("/students/(auth)/forgot-password")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialAuthButton}
            onPress={() => router.navigate("/instructor/(auth)/social-auth")}
          >
            <Text style={styles.socialAuthText}>More Sign In Options</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  formContainer: {
    padding: 20,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#4169E1",
    fontSize: 14,
  },
  socialAuthButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4169E1",
  },
  socialAuthText: {
    color: "#4169E1",
    textAlign: "center",
    fontSize: 16,
  },
  passwordRequirements: {
    marginBottom: 16,
  },
  requirementText: {
    fontSize: 12,
    color: "#666",
  },
  requirementMet: {
    color: "#2ecc71",
  },
});

export default LoginScreen;
