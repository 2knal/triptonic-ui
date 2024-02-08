import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Button from '../components/utils/button';
import ActionSheet from '../components/utils/action-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import Prompt from '../components/prompt';

export default function App() {
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
	const handleOpenPress = (index: number) => bottomSheetRef.current?.snapToIndex(index);
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/screens/new_york.png')}
        style={styles.image}
      >
        <ActionSheet
          ref={bottomSheetRef}
          index={index}
          handleSheetChanges={handleSheetChanges}
          children={ <Prompt /> } />
        <View style={styles.buttonContainer}>
          {index < 0 && <Button title="Let's plan!" color='#EC988D' onPress={() => {
            handleOpenPress(1);
          }} />}
        </View>
      </ImageBackground>
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
});
