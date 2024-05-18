import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { axios } from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/HomeScreen.js';
import { LoginScreen } from './src/LoginScreen.js';
import { SignupScreen } from './src/SignupScreen.js';

/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ userAccount: "Not logged in yet", userPass: "None", session: false }}/>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Sign Up' component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
