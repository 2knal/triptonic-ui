import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '@/components/Splash';
import Save from './save';
import Login from './login';
import Trip from './trip';
import Main from './main';

const Stack = createStackNavigator();

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); 
  }, []);

  if (isLoading) {
    return <Splash setIsLoading={setIsLoading} />;
  }

  return (
    <Login/>

      //  <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      //    <Stack.Screen name="Main" component={Main} />
        /* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Save" component={Save} /> 
        <Stack.Screen name="Trip" component={Trip} /> */
      // </Stack.Navigator>
  );
}


