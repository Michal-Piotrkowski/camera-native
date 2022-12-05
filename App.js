import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Main"
import Menu from "./components/Menu"

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
              headerShown: true
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
