import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "assets/constants";

interface ISplashProps {
  setIsLoading: Dispatch<SetStateAction<Boolean>>;
}

export default function Splash({ setIsLoading }: ISplashProps) {
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          flex: 1,
          width: 180,
          height: 180,
          backgroundColor: COLORS["egg-white"],
        }}
        source={require("../../assets/animations/map-logo.json")}
        autoPlay={true}
        speed={1}
        loop={false}
        onAnimationFinish={() => setIsLoading(false)}
      />
      <View className="absolute bottom-14">
        <Text
          className="text-4xl color-darker-text font-bricolage mt-2"
        >
          TripTonic
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS['egg-white']
  },
});
