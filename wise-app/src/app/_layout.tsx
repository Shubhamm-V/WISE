import { StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FONTS } from "../constants/fonts";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import { COLORS } from "../constants/colors";
import "expo-dev-client";
// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [fontsLoaded, fontError] = useFonts(FONTS);
  const [appIsReady, setAppIsReady] = useState(false);
  const auth = getAuth();

  const checkEmailVerified = async () => {
    const user: any = auth.currentUser;
    await user.reload(); // Refresh user data
    return user.emailVerified;
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Checking if fonts are loaded
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (typeof isAuthenticated === "undefined" || !appIsReady) return;

    const inApp = segments[0] === "(app)";

    const handleAuthRedirects = async () => {
      if (isAuthenticated) {
        // const isEmailVerified = await checkEmailVerified();
        if (!inApp) {
          router.replace("home");
        } else if (!inApp) {
          // router.replace("email-verification");
        }
      } else {
        router.replace("login");
      }
    };

    handleAuthRedirects();
  }, [isAuthenticated, appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Render nothing while the app is not ready
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider store={store}>
        <Slot />
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.light} />
      </Provider>
    </View>
  );
};

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
};

export default RootLayout;
