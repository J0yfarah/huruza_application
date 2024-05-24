
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import React from 'react';


const padding = {
  appVertical: 24,
  appHorizontal: 24,
};

export default function App() {
  return (

    
    <NavigationContainer>
      <View style={styles.container}></View>
      <MainNavigator />
         </NavigationContainer>

   
     
  
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: padding.appVertical,
    paddingBottom: padding.appVertical,
    paddingLeft: padding.appHorizontal,
    paddingRight: padding.appHorizontal
  },
});
