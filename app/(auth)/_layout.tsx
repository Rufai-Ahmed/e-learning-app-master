import { Stack } from "expo-router";
import { SessionHandler } from "../_layout";
import { useState } from "react";

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="role-selection" options={{ headerShown: false }} />
      </Stack>
  );
}
