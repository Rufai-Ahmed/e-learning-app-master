import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserInfo, getUserLoginToken } from "@/lib/reducers/storeUserInfo";

const ResetPasswordScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");
  const params = useLocalSearchParams();
  const { email, code } = params;
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const { password } = data;

      const body = {
        email,
        code,
        password,
      };

      console.log(body);

      const res = await api.resetPassword(body);

      console.log(res, "data");

      showAlert("success", "Account Password resetted successfully");

      setTimeout(() => {
        router.push({
          pathname: "/instructor/(auth)/login",
        });
      }, 500);
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data.detail) {
        showAlert("error", err.response?.data.detail);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Error resetting your account password. Try again");
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Create a new password for your account
          </Text>

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="New Password"
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
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showConfirmPassword}
                error={!!error}
                left={
                  <TextInput.Icon
                    icon={() => <Lock size={20} color="#4169E1" />}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() =>
                      showConfirmPassword ? (
                        <EyeOff size={20} color="#4169E1" />
                      ) : (
                        <Eye size={20} color="#4169E1" />
                      )
                    }
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                style={styles.input}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#4169E1"
              />
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
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
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
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
});

export default ResetPasswordScreen;
