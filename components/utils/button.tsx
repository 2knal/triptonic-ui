import { useNavigation } from 'expo-router';
import React, { ForwardRefRenderFunction, forwardRef }  from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

// interface IButtonProps {
//   onPress: () => void;
//   color?: string;
//   textColor?: string;
//   title: string;
// }

// export default function Button(props: IButtonProps) {
//   const { onPress, title, color = styles.button.backgroundColor, textColor = styles.text.color } = props;
//   return (
//     <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
//       <Text style={[styles.text, { color: textColor }]}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

interface IButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  color?: string;
  textColor?: string;
  title: string;
}

const Button: ForwardRefRenderFunction<TouchableOpacity, IButtonProps> = (props, ref) => {
  const { onPress, title, color = styles.button.backgroundColor, textColor = styles.text.color, ...rest } = props;

  return (
    <TouchableOpacity ref={ref} style={[styles.button, { backgroundColor: color }]} onPress={onPress} {...rest}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default forwardRef(Button);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: 'black',
    width: 160,
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
