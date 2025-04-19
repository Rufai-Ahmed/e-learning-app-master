import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Platform,
  Alert,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const colors = {
  primary: "#4169E1",
  secondary: "#87CEEB",
  background: "#FFFFFF",
};

const DepositWebView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/students/(tabs)");
    }
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBack
      );

      return () => {
        backHandler.remove();
      };
    }, [handleBack])
  );

  const handleNavigationStateChange = (navState: { url: string }) => {
    const { url } = navState;
    if (url.includes("payment-success")) {
      Alert.alert("Success", "Payment completed successfully!");
      router.push("/students/(tabs)/my-learning");
    } else if (url.includes("payment-failed")) {
      Alert.alert("Failed", "Payment failed. Please try again.");
      router.push("/students");
    }
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Pay for Course",
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerLeft: () => (
              <Ionicons
                name="close"
                size={24}
                color={colors.primary}
                onPress={handleBack}
                style={styles.closeButton}
              />
            ),
          }}
        />
        <iframe
          src={params?.uri as string}
          style={styles.webview}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Pay for Course",
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerLeft: () => (
              <Ionicons
                name="close"
                size={24}
                color={colors.primary}
                onPress={handleBack}
                style={styles.closeButton}
              />
            ),
          }}
        />
        <WebView
          source={{ uri: params?.uri as string }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    borderWidth: 0,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    padding: 8,
  },
});

export default DepositWebView;
