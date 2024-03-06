import "../global.css";
import { Slot, SplashScreen } from "expo-router";

import Header from "@/components/header";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appReady, setAppReady] = useState(false);
    const [fontsLoaded] = useFonts({
    bricolage: require("../../assets/fonts/bricolage.ttf"),
    rethink: require("../../assets/fonts/rethink.ttf"),
    "rethink-italic": require("../../assets/fonts/rethink-italic.ttf"),
  });

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" backgroundColor="#FFF2EE" />
        <Header />
        <Slot />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
