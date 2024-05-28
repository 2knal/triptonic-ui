import "../global.css";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { COLORS } from "assets/constants";
import { useRef, useState, useCallback, useEffect } from "react";
import { Animated, Easing } from "react-native";
import Splash from "@/components/splash";
import { ToastProvider } from "react-native-toast-notifications";
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/'), 'https://triptonic.app'],
  config: {
    screens: {
      trip: {
        path: 'trip/:id',
        parse: {
          id: (id) => `${id}`,
        },
      },
    },
  },
};

export default function Layout() {
  const animationProgress = useRef(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    bricolage: require("../../assets/fonts/bricolage/bricolage.ttf"),
    rethink: require("../../assets/fonts/rethink/rethink.ttf")
  });

  const onApplicationReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Splash setIsLoading={onApplicationReady} />;
  }

  return (
    <SafeAreaProvider>
        <MenuProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="dark" backgroundColor={COLORS["egg-white"]} />
            <ToastProvider>
              <Header />
              <Slot />
            </ToastProvider>
          </GestureHandlerRootView>
        </MenuProvider>
    </SafeAreaProvider>
  );
}
