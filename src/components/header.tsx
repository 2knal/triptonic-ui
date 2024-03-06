import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        <Text
          className="text-3xl color-darker-text font-bricolage mt-2"
        >
          TripTonic
        </Text>
      </View>
    </View>
  );
}
