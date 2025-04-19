import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/actions/api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserLoginToken } from "@/lib/reducers/storeUserInfo";
import React from "react";

const VerifyEmailScreen = () => {
  const params = useLocalSearchParams();
  const { email, type } = params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  interface OtpChangeHandler {
    (value: string, index: number): void;
  }

  const handleOtpChange: OtpChangeHandler = (value, index) => {
    // Handle pasting a full or partial OTP
    if (index === 0 && value.length > 1) {
      if (value.length >= 6) {
        // Handle full OTP paste
        const otpArray = value.slice(0, 6).split("");
        setOtp(otpArray);
        inputRefs.current[5]?.focus();
      } else {
        // Handle partial OTP paste
        const pastedOtp = value.split("");
        const newOtp = [...otp];

        // Fill in the pasted characters
        pastedOtp.forEach((char, idx) => {
          if (idx < 6) {
            newOtp[idx] = char;
          }
        });

        setOtp(newOtp);

        // Focus the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex(
          (char, idx) => idx >= pastedOtp.length && char === ""
        );
        if (nextEmptyIndex !== -1) {
          inputRefs.current[nextEmptyIndex]?.focus();
        } else {
          inputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
        }
      }
    } else {
      // Handle single character input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if available
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      if (canResend) {
        if (type === "signup") {
          await api.sendVerificationEmail({ email });
        } else if (type === "reset-password") {
          await api.sendForgotPwdVerificationEmail({ email });
        }
        showAlert("success", "Otp sent successfully!");
        console.log("Resending OTP...");

        setTimer(30);
        setCanResend(false);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response?.data.message) {
        showAlert("error", err.response?.data.message);
      } else if (err.message) {
        showAlert("error", err.message);
      } else {
        showAlert("error", "Error re-sending otp. Try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const otpString = otp.join("");
    try {
      console.log("Verifying OTP:", otpString);

      const body = {
        email,
        code: otpString,
      };

      if (type === "signup") {
        const res = await api.verifyEmail(body);

        console.log(res?.data.token);

        dispatch(getUserLoginToken(res?.data.token));
        showAlert("success", "OTP verified successfully");
      }

      setTimeout(() => {
        if (type === "reset-password") {
          router.push({
            pathname: "/instructor/(auth)/reset-password",
            params: body,
          });
        } else if (type === "signup") {
          router.push("/instructor/(auth)/login");
        }
      }, 500);
    } catch (error: any) {
      console.error(error);
      if (error.response?.data.message) {
        showAlert("error", error.response?.data.message);
      } else if (error.message) {
        showAlert("error", error.message);
      } else {
        showAlert("error", "Failed to verify OTP. Please try again.");
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
          <Text style={styles.title}>Verify Your Email</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to {email}. Enter the code below to
            confirm your email address.
          </Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.resendButton,
              !canResend && styles.resendButtonDisabled,
            ]}
            onPress={handleResend}
            disabled={!canResend}
          >
            <Text
              style={[
                styles.resendText,
                !canResend && styles.resendTextDisabled,
              ]}
            >
              {canResend ? "Resend Code" : `Resend in ${timer}s`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#4169E1",
    borderRadius: 10,
    fontSize: 24,
    textAlign: "center",
    color: "#4169E1",
  },
  resendButton: {
    marginBottom: 20,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: "#4169E1",
    fontSize: 16,
    fontWeight: "600",
  },
  resendTextDisabled: {
    color: "#666666",
  },
  verifyButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VerifyEmailScreen;
