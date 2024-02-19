import React, { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

interface INavBarProps {
  onPress: any;
}

export default function NavBar(props: INavBarProps) {
  const { onPress } = props;

  const onPressOpenSave = () => {
  }

  return (
    <View style={{alignItems: 'center'}}>
      <View style={[styles.mainView]}>
        <Pressable onPress={() => onPress(1)}>
          <FontAwesome name="pencil" color="#FFF2EE" size={24}/>
        </Pressable>
        <Pressable onPress={() => onPress(2)}>
          <FontAwesome name="sliders" color="#FFF2EE" size={24}/>
        </Pressable>
        <Pressable onPress={() => onPressOpenSave}>
          <Link href='/save' asChild>
            <FontAwesome name="floppy-o" color="#FFF2EE" size={24}/>
          </Link>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: "10%",
    flexDirection: 'row',
    backgroundColor: '#EC988D',
    height: 62,
    borderRadius: 40,
    width: 200
  }
});
