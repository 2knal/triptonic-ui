import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavButton from '../components/utils/nav-button';
import Icon from '../components/utils/icon';

export default function Details() {
  return (
    <View style={styles.container}>
      {/* <NavButton onPress={() => {}} title={'&#8592;'}        
      /> */}
      <Icon code='&#8592;' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D9'
  }
});
