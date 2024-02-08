import React, { useState } from 'react';
import Textarea from '../components/utils/textarea';
import { View, StyleSheet } from 'react-native';
import Button from './utils/button';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';

export default function Prompt() {
  const [text, setText] = useState('');
  const { close: closePrompt } = useBottomSheet();

  return (
    <View style={styles.container}>
      <Textarea
        placeholder='Enter Trip prompt...'
        text={text}
        onChangeText={(t: string) => setText(t)} />
      <View style={styles.row}>
        <Button
          textColor='#B6B6B6'
          title="Cancel"
          color='#EDD5D1'
          onPress={() => closePrompt()}/>
        <Link href="/trip" asChild>
          <Button 
            title="Generate"
            color='#EC988D'
            onPress={() => {}}/>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#1E1E1E',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
