import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';


const ForwardButton = () => {
    const [isClicked, setIsClicked] = useState(false);
    const buttonColor = isClicked ? '#EC988D' : '#FFC8B8'; 
  
    return (
      <TouchableOpacity
      onPressIn={() => setIsClicked(true)}
      onPressOut={() => setIsClicked(false)}
        style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.text}>{'\u2192'}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  button: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 50,
  height: 50, 
  borderRadius: 45, 
  backgroundColor: '#EC988D',
  justifyContent: 'center', 
  alignItems: 'center',
  },
  text: {
    fontSize: 30,
    lineHeight: 30,
    color: 'white',
    alignContent: 'center'
  },
});
export default ForwardButton;
