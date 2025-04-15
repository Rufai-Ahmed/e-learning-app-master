import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { api } from "@/lib/actions/api";

const AuthCallbackScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log("Initial URL:", initialUrl);

        if (initialUrl) {
          const { queryParams } = Linking.parse(initialUrl);
          console.log("Parsed query params:", queryParams);

          if (queryParams && Object.keys(queryParams).length > 0) {
            const response = await api.verifyGoogleCallback(queryParams);
            console.log("Backend verification successful:", response);
            router.push("/instructor/(tabs)"); 
            return;
          } else {
            Alert.alert("Error", "No authentication parameters found in the callback URL.");
          }
        } else {
          Alert.alert("Error", "No initial URL was found.");
        }
      } catch (error) {
        console.error("Error processing authentication callback:", error);
        Alert.alert("Error", "Failed to process authentication callback.");
      } finally {
        setLoading(false);
      }
      // On error, you might want to redirect the user to a safe place:
      router.push("/instructor/(auth)/login");
    };

    processCallback();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4169E1" />
        <Text style={styles.loadingText}>Verifying authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>An error occurred while processing authentication.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#4169E1",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default AuthCallbackScreen;
