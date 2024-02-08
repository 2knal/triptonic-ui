import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/utils/button';
import ActionSheet from '../components/utils/action-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import Prompt from '../components/prompt';
import Filter from '../components/filter';

export default function Trip() {
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
        children={ <Filter /> }/>
      <View style={styles.buttonContainer}>
        {index < 0 && <Button title="" color='#EC988D' onPress={() => {
          handleOpenPress(3);
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