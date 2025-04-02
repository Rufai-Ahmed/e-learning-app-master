import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Checkbox } from "react-native-paper";
import { User, Mail, Lock, ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Watch the password field to validate the confirm password field.
  const passwordValue = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const { fullName, password, email } = data;

      // Normalize email: trim whitespace and convert to lowercase
      const normalizedEmail = email.trim().toLowerCase();

      const body = {
        fullname: fullName,
        email: normalizedEmail,
        password,
      };

      await api.createAccount(body, "instructor");

      await api.sendVerificationEmail({ email: normalizedEmail });

      showAlert("success", "Account created successfully");

      setTimeout(() => {
        router.push({
          pathname: "/instructor/(auth)/verify-email",
          params: {
            email: normalizedEmail,
            type: "signup",
          },
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Instructor Account</Text>
        </LinearGradient>

        <ScrollView style={styles.formContainer}>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="Full Name"
                value={value}
                onChangeText={onChange}
                error={!!error}
                left={
                  <TextInput.Icon
                    icon={() => <User size={20} color="#4169E1" />}
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
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
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
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!error}
                left={
                  <TextInput.Icon
                    icon={() => <Lock size={20} color="#4169E1" />}
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
                value === passwordValue || "Passwords do not match",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  label="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={!!error}
                  left={
                    <TextInput.Icon
                      icon={() => <Lock size={20} color="#4169E1" />}
                    />
                  }
                  style={styles.input}
                  mode="outlined"
                  outlineColor="#E0E0E0"
                  activeOutlineColor="#4169E1"
                />
                {error && <Text style={{ color: "red" }}>{error.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name="acceptTerms"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.termsContainer}>
                <Checkbox.Android
                  status={value ? "checked" : "unchecked"}
                  onPress={() => onChange(!value)}
                  color="#4169E1"
                />
                <Text style={styles.termsText}>
                  I accept the Terms of Service and Privacy Policy
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  termsText: {
    color: "#666666",
    marginLeft: 8,
    flex: 1,
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

export default SignUpScreen;
