import React, { ReactNode, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IActionSheetProps {
  index: number;
  children: ReactNode
}

const ActionSheet: React.FC<IActionSheetProps> = ({ index, children }) => {
  const snapPoints = useMemo(() => ['20%', '40%', '60%', '80%', '100%'], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet index={index} snapPoints={snapPoints}>
        {children}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default ActionSheet;
