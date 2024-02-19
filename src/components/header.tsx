import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="bg-egg-white px-4 lg:px-6 h-14 flex items-center flex-row justify-center">
        <Text
          className="text-4xl color-darker-text font-bricolage"
        >
          TripTonic
        </Text>
      </View>
    </View>
  );
}
