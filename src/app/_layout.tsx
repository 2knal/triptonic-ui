import "../global.css";
import { Slot } from "expo-router";

import Header from "@/components/header";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    bricolage: require("../../assets/fonts/bricolage.ttf"),
    rethink: require("../../assets/fonts/rethink.ttf"),
    "rethink-italic": require("../../assets/fonts/rethink-italic.ttf"),
  });

  if (!fontsLoaded) {
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
