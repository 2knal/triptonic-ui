import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "assets/constants";

import Heading from "@/components/utils/heading";


export default function Loader() {
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          flex: 1,
          width: 180,
          height: 180,
          backgroundColor: COLORS["egg-white"],
        }}
        source={require("../../assets/animations/loader.json")}
        autoPlay={true}
        speed={1}
        loop={true}
      />
      {/* <View className="absolute bottom-14">
        <Heading title="TripTonic" css="text-3xl mt-2" />
      </View> */}
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
