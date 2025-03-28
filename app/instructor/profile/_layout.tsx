import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="devices"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="faqs"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="report-issue"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="guides"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tutorials"
        options={{
          headerShown: false,
        }}
      />
            <Stack.Screen
        name="terms"
        options={{
          headerShown: false,
        }}
      />
      
    </Stack>
  );
} 