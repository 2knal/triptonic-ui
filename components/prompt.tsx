import React, { useState } from 'react';
import Textarea from '../components/utils/textarea';
import { View, StyleSheet } from 'react-native';
import Button from './utils/button';

export default function Prompt() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Textarea
        placeholder='Enter Trip prompt...'
        text={text}
        onChangeText={(t: string) => setText(t)} />
      <View style={styles.row}>
        <Button 
          title="Cancel"
          color='#F0Af9c'
          onPress={() => {}}/>
        <Button 
          title="Generate"
          color='#EC988D'
          onPress={() => {}}/>
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
