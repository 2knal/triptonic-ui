import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import MapView from "react-native-maps";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Prompt from "@/components/prompt";
import ActionSheet from "@/components/utils/action-sheet";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["48%", "72%"];

  return (
    <BottomSheetModalProvider>
      <View className="flex flex-1 bg-egg-white">
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: 32.8241205,
            longitude: -117.4386322,
            latitudeDelta: 1,
            longitudeDelta: 2,
          }}
        />
        <Pressable
          className="absolute bottom-14 self-center bg-cute-pink w-80 flex items-center justify-center px-4 py-4 rounded-3xl"
          onPress={() => bottomSheetRef.current?.present()}
        >
          <Text className="font-rethink text-2xl color-egg-white">
            Let's plan!
          </Text>
        </Pressable>

        {/* <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
        >
          <Prompt />
        </BottomSheetModal> */}
        <ActionSheet
          ref={bottomSheetRef}
          index={0}
          children={<Prompt/>}/>
      </View>
    </BottomSheetModalProvider>
  );
}
