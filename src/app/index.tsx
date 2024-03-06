import React, { useRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Prompt from "@/components/prompt";
import ActionSheet from "@/components/utils/action-sheet";
import CoolButton from "@/components/utils/cool-button";
import Map from "@/components/utils/map";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View className="flex flex-1 bg-egg-white">
      <Map />
      <View className="absolute bottom-14 self-center">
        <CoolButton
          onPress={() => bottomSheetRef.current?.present()}
          buttonCss="bg-reddish w-80"
          textCss="color-egg-white"
          text={"Let's plan!"} />
        </View>
      <ActionSheet ref={bottomSheetRef} index={0} children={<Prompt />} />
    </View>
  );
}
