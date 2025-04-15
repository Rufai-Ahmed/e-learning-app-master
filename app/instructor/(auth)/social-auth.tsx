import { api } from "@/lib/actions/api";
import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ArrowLeft, MailIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SocialAuthScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_ID,
      offlineAccess: true,
      scopes: ["profile", "email"],
      forceCodeForRefreshToken: false,
      // iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Trigger Google Sign In
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);

      const { data } = userInfo;
      if (!data?.idToken) {
        Alert.alert("Error", "No idToken retrieved from Google Sign-in.");
        return;
      }

      console.debug({ data }); // const authResponse = await api.verifyIdToken({ idToken });
      // console.log("Backend verification successful!", authResponse);

      // At this point, you can save the authentication token and user info as needed.
      // Then, navigate to the main application screen.
      // router.push("/instructor/(tabs)");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "Google Play Services not available or outdated.");
      } else {
        console.error("Error during Google sign in:", error);
        Alert.alert(
          "Authentication Error",
          "Something went wrong with Google sign in."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#4169E1", "#6495ED"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={[styles.subtitle, { color: "white" }]}>Instructor</Text>
        <Text style={styles.title}>Log in or Sign up</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Choose your preferred sign in method
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
          >
            <Ionicons name="logo-google" size={24} color="#4169E1" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Uncomment this block if you add Facebook sign-in functionality in future.
          <TouchableOpacity 
            style={[styles.socialButton, styles.facebookButton]}
            onPress={() => console.log('Facebook sign in')}
          >
            <FacebookIcon size={24} color="#4169E1" />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => router.navigate("/instructor/(auth)/login")}
          >
            <MailIcon size={24} color="#4169E1" />
            <Text style={styles.socialButtonText}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => router.navigate("/instructor/(auth)/signup")}
        >
          <Text style={styles.createAccountText}>
            New to platform? Create an Account
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </View>
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
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
  },
  facebookButton: {
    backgroundColor: "#FFFFFF",
  },
  emailButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#4169E1",
  },
  socialButtonText: {
    color: "#4169E1",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    color: "#666666",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  createAccountButton: {
    padding: 16,
  },
  createAccountText: {
    color: "#4169E1",
    fontSize: 16,
    textAlign: "center",
  },
  termsText: {
    color: "#666666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 32,
  },
  linkText: {
    color: "#4169E1",
  },
});

export default SocialAuthScreen;
