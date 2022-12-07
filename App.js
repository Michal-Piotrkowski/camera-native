import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';
import Main from "./components/Main"
import Menu from "./components/Menu"
import CameraScreen from './components/CameraScreen';
import BigPhoto from './components/BigPhoto'

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="s1"
            component={Main}
            options={{
              headerShown: false
            }} />
          <Stack.Screen
            name="s2"
            component={Menu}
            options={{
              title: 'ZDJĘCIA Z FOLDERU DCIM',
              headerShown: true,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'rgb(255, 120, 212)',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                "fontFamily": "sans-serif",
                "fontSize": 22,
                "fontWeight": "900",
                "letterSpacing": 0,
                "lineHeight": 40,
              },
            }} />
            <Stack.Screen
            name="s3"
            component={CameraScreen}
                  options={{
              title: 'Kamera',
              headerShown: true,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'rgb(255, 120, 212)',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                "fontFamily": "sans-serif",
                "fontSize": 22,
                "fontWeight": "900",
                "letterSpacing": 0,
                "lineHeight": 40,
              },
            }} />
            <Stack.Screen
            name="s4"
            component={BigPhoto}
                  options={{
              title: 'Zdjęcie',
              headerShown: true,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'rgb(255, 120, 212)',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                "fontFamily": "sans-serif",
                "fontSize": 22,
                "fontWeight": "900",
                "letterSpacing": 0,
                "lineHeight": 40,
              },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
