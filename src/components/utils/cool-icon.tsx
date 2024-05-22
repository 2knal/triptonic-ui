import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "assets/constants";
import { Pressable } from "react-native";

interface ICoolIconProps {
  iconName: any;
  onPress?: any;
  color?: any;
  css?: string;
}

export default function CoolIcon({ iconName, color, css, onPress }: ICoolIconProps) {
  if (!color) {
    color = COLORS['gray-light'];
  }

  return (
    <Pressable onPress={onPress} className={"rounded-full w-12 h-12 justify-center items-center " + css}>
      <FontAwesome name={iconName} color={color} size={24} className="color-reddish" />
    </Pressable>
  );
}
