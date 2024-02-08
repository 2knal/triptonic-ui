import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/button';
import ActionSheet from '../components/action-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';

export default function App() {
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
	const handleOpenPress = (index: number) => bottomSheetRef.current?.snapToIndex(index);
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <View style={styles.container}>
      <ActionSheet
        ref={bottomSheetRef}
        index={index}
        handleSheetChanges={handleSheetChanges}
        children={
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
      } />
      <View style={styles.buttonContainer}>
        {index < 0 && <Button title="Let's plan!" color='#EC988D' onPress={() => {
          handleOpenPress(1);
        }} />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D9'
  },
  contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    zIndex: 1000
  },
  button: {
    backgroundColor: '#EC988D',
  }
});
