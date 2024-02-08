import React, { useState } from 'react';
import Textarea from '../components/utils/textarea';
import { View, StyleSheet } from 'react-native';
import Button from './utils/button';
import { Link } from 'expo-router';
import { Text } from 'react-native';

export default function Filter() {
    return(
        <View style={styles.container}>
            <Text>Cuisine</Text>
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