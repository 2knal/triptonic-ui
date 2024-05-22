import React, { ReactNode, useMemo, forwardRef, useCallback } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';


interface IActionSheetProps {
  index: number;
  children: ReactNode;
  handleSheetChanges?: any;
}

type Ref = BottomSheetModal;


const ActionSheet = forwardRef<Ref, IActionSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ['72%', '95%'], []);
  const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={props.index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        backdropComponent={renderBackdrop}
        onChange={props.handleSheetChanges}
      >
        <BottomSheetScrollView contentContainerClassName="flex flex-1 h-full"
        contentContainerStyle={{ flexGrow: 1 }}>
          {props.children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default ActionSheet;
