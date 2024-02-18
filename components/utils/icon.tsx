import React from 'react';
import { View } from 'react-native';
import HTML from 'react-native-render-html';

interface IIconProps {
  code: string;
}

const Icon: React.FC<IIconProps> = ({ code }) => {
  return (
    <View>
      <HTML contentWidth={32} source={{ html: code }} />
    </View>
  );
};

export default Icon;
