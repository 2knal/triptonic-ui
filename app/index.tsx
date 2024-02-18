import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/utils/button';
import ActionSheet from '../components/utils/action-sheet';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import MapView from 'react-native-maps';

import Prompt from '../components/prompt';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    // <BottomSheetModalProvider>
    // <View style={styles.container}>
    //   {/* <MapView style={styles.map} /> */}
    //   <View style={styles.buttonContainer}>
    //     <Button title="Let's plan!" color='#EC988D' onPress={() => bottomSheetRef.current?.present()} />
    //   </View>
      // <ActionSheet
      //   ref={bottomSheetRef}
      //   index={index}
      //   handleSheetChanges={handleSheetChanges}
      //   children={ <Prompt /> } />
    // </View>
    // </BottomSheetModalProvider>
    // </GestureHandlerRootView>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <MapView style={styles.map} />
          <View style={styles.buttonContainer}>
            <Button title='Open' onPress={() => bottomSheetRef.current?.present()} />
          </View>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={['25%', '50%', '75%']}
          >
            {/* <View>
              <Text>Hello!</Text>
            </View> */}
            <Prompt />
          </BottomSheetModal>
          {/* <ActionSheet
            ref={bottomSheetRef}
            index={index}
            handleSheetChanges={handleSheetChanges}
            children={ <Prompt /> } /> */}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FEF4D9',
    // width: '100%',
    // height: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#EC988D',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch' or 'contain' as needed
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
});
