import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getThemeData } from "@/lib/reducers/storeThemeData";
import { axios } from "@/lib/axios";
import { getUserInfo } from "@/lib/reducers/storeUserInfo";
import { AlertProvider } from "@/context/AlertContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [layoutReady, setLayoutReady] = useState(false);

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
      <AlertProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
            <SessionHandler
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              layoutReady={layoutReady}
            />
          </ThemeProvider>
        </GestureHandlerRootView>
      </AlertProvider>
    </Provider>
  );
}

const SessionHandler = ({ isDarkMode, setIsDarkMode, layoutReady }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.themeData);
  const userData = useAppSelector((state) => state.user.user);
  const userToken = useAppSelector((state) => state.user.userLoginToken);
  const router = useRouter();

  if (layoutReady) {
    useEffect(() => {
      // router.push('/(auth)/splash')

      dispatch(getThemeData(theme));
      setIsDarkMode(theme);

      if (userData) {
        const date = Date.now();

        const getUserCurrentSession = async () => {
          try {
            const response = await axios.get(`/user/session`, {
              headers: {
                Authorization: userToken,
              },
            });

            console.log(response.data, "user session");

            router.push("/(tabs)");
          } catch (err) {
            console.log((err as any).response.data);

            if ((err as any).response.data.message) {
              dispatch(getUserInfo(null));

              router.push("/(auth)");
            } else {
              router.push("/(auth)");
            }
          }
        };

        getUserCurrentSession();
      } else {
        router.push("/(auth)");
      }
    }, [isDarkMode, dispatch, theme]);
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="students" options={{ headerShown: false }} />
      <Stack.Screen name="instructor" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
