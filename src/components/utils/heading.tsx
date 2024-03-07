import { Text } from "react-native";

interface IHeadingProps {
  title: string;
  css?: string;
}

export default function Heading({ title, css }: IHeadingProps) {
  return (
    <Text className={"color-darker-text font-bricolage tracking-widest " + css}>
      {title}
    </Text>
  );
}
