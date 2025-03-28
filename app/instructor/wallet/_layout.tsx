import { Stack } from 'expo-router';

export default function RootLayout() {

  return (

      <Stack>
        <Stack.Screen name="add-funds" options={{ headerShown: false }} />
        <Stack.Screen name="withdraw" options={{ headerShown: false }} />
        <Stack.Screen name="payment-webview" options={{ headerShown: false }} />
        <Stack.Screen name="banks" options={{ headerShown: false }} />
        <Stack.Screen name="withdraw-confirm" options={{ headerShown: false }} />
        

        {/* <Stack.Screen name="course-learning-video" options={{ headerShown: false }} /> */}
      </Stack>
  );
}

