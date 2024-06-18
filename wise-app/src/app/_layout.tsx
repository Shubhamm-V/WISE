import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FONTS } from "../constants/fonts";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [fontsLoaded, fontError] = useFonts(FONTS);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Initialize the app
    async function prepare() {
      try {
        // Check if fonts are loaded
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
    // Check user is authenticated or not
    if (typeof isAuthenticated === "undefined" || !appIsReady) return;

    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      // Redirect to home
      router.replace("home");
    } else if (!isAuthenticated) {
      // Redirect to login
      router.replace("login");
    }
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
      <Slot />
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

const styles = StyleSheet.create({});
