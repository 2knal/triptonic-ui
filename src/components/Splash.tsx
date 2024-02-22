import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';

interface SplashProps {
    setIsLoading : Dispatch<SetStateAction<Boolean>>;
}

export default function Splash({setIsLoading}: SplashProps) {
  return (
    <View style={styles.text}>
      <LottieView style = {{flex: 1, width: "100%" ,height: "100%"}}
        source={require('../../assets/animation/Splash.json')}
        autoPlay = {true}
        speed={1}
        loop={false}
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
