import React, { ReactNode, useMemo, forwardRef, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


interface IActionSheetProps {
  index: number;
  children: ReactNode;
  handleSheetChanges: any;
}

type Ref = BottomSheetModal;


const ActionSheet = forwardRef<Ref, IActionSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ['20%', '40%', '60%', '90%'], []);
  const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={props.index}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onChange={props.handleSheetChanges}
        >
          {props.children}
        </BottomSheetModal>
    //   </BottomSheetModalProvider>
    // </GestureHandlerRootView>
  );
});

export default ActionSheet;
