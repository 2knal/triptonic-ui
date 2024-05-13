import { Text } from "react-native";

interface ICoolText {
  title: any;
  css?: string;
}

export default function CoolText({ title, css }: ICoolText) {
  return (
    <Text className={"color-dark-text font-rethink " + css}>
      {title}
    </Text>
  );
}
