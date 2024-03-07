import { View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Heading from "@/components/utils/heading";



export default function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="bg-egg-white px-4 lg:px-6 h-14 flex items-center flex-row justify-center align-middle">
        <Image
          source={require('../../assets/triptonic-logo.png')}
          style={{ width: 42, height: 42 }}
          className="mr-1"
        />
        <Heading title="TripTonic" css="text-3xl" />
      </View>
    </View>
  );
}
