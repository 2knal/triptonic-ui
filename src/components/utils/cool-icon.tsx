import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "assets/constants";
import { TouchableOpacity } from "react-native";

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
    <TouchableOpacity onPress={onPress} className={"rounded-full w-12 h-12 justify-center items-center " + css}>
      <FontAwesome name={iconName} color={color} size={20} className="color-reddish" />
    </TouchableOpacity>
  );
}
