import { Stack } from 'expo-router';

export default function RootLayout() {

  return (

      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="see-all-course" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search-results" options={{ headerShown: false }} />
        <Stack.Screen name="browse-categories-results" options={{ headerShown: false }} />
        <Stack.Screen name="course-details" options={{ headerShown: false }} />
        <Stack.Screen name="course-learning-details" options={{ headerShown: false }} />
        <Stack.Screen name="student" options={{ headerShown: false }} />
        <Stack.Screen name="conversation" options={{ headerShown: false }} />
        <Stack.Screen name="notification" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />


        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
  );
}

