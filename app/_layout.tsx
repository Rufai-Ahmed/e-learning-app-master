import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { AlertProvider } from "@/context/AlertContext";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useColorScheme } from "@/hooks/useColorScheme";
import { api } from "@/lib/actions/api";
import { getThemeData } from "@/lib/reducers/storeThemeData";
import { getUserInfo } from "@/lib/reducers/storeUserInfo";
import { persistor, store } from "@/lib/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
              <SessionHandler
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </ThemeProvider>
          </GestureHandlerRootView>
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}

export const SessionHandler = ({ isDarkMode, setIsDarkMode }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.themeData);
  const userData = useAppSelector((state) => state.user.user);
  const userToken = useAppSelector((state) => state.user.userLoginToken);

  useEffect(() => {
    dispatch(getThemeData(theme));
    setIsDarkMode(theme);

    if (userData === null) router.push("/(auth)");

    if (userData) {
      const getUserCurrentSession = async () => {
        try {
          await api.getUserCategories(userData?.id, userToken);

          const userRole = userData?.roles.map(
            (e: { name: string }) => e.name
          )?.[0] as "student" | "instructor";
          setTimeout(() => {
            if (userRole === "student") router.push("/students/(tabs)");
            else router.push("/instructor/(tabs)");
          }, 0);
        } catch (err) {
          console.log((err as any).response.data);
          setTimeout(() => {
            dispatch(getUserInfo(null));
            router.push("/(auth)");
          });
        }
      };

      getUserCurrentSession();
    } else {
      setTimeout(() => {
        router.push("/(auth)");
      });
    }
  }, [isDarkMode, dispatch, theme, userData, userToken, router, setIsDarkMode]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="students" options={{ headerShown: false }} />
      <Stack.Screen name="instructor" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
