import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const colors = {
  primary: "#4169E1",
  secondary: "#87CEEB",
  background: "#FFFFFF",
};

const DepositWebView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();


  console.log(params)
  useFocusEffect(
    useCallback(() => {
    let backhandler;

    backhandler = BackHandler.addEventListener('hardwareBackPress', ()=> {
        router.push('/students/(tabs)')

        return true
    })

    return () => {
        backhandler.remove()
    }
    }, [])
  )

  const handleNavigationStateChange = (navState: any) => {
    // Handle navigation state changes
    // You can check for success/failure URLs here
    const { url } = navState;
    
    if (url.includes('payment-success')) {
      // Handle successful payment
      router.push('/transaction-status/success');
    } else if (url.includes('payment-failed')) {
      // Handle failed payment
      router.push('/transaction-status/failed');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Pay for Course',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <Ionicons
              name="close"
              size={24}
              color={colors.primary}
              onPress={() => router.back()}
              style={styles.closeButton}
            />
          ),
        }}
      />

      <WebView
        source={{ uri: params?.uri }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
  },
});

export default DepositWebView; 