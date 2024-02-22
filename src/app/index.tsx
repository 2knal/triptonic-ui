import React, { useCallback, useRef } from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import Main from './main';
import Splash from '@/components/Splash';
export default function Index() {
 const [isLoading, setIsLoading] = React.useState<boolean>(true);

  return isLoading? <Splash setIsLoading = {setIsLoading}/> : <Main/>
};

