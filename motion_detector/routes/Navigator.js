import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//screens
import Scanner from '../screens/Scanner';
import Joystick from '../screens/Joystick';


const Stack = createNativeStackNavigator();

function Navigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="scanner" component={Scanner} />
          <Stack.Screen name="joystick" component={Joystick} />
        </Stack.Navigator>
        </NavigationContainer>
      );
}

export default Navigator;
