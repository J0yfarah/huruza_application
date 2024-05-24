
// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, Modal } from 'react-native';
import * as Font from 'expo-font';
import LoginScreen from './screens/LoginScreen';// Ensure this is the correct path

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/logowhite.png')} style={styles.logo} />
        </View>
        <View style={styles.content}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => setIsLoginModalVisible(true)}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => setIsLoginModalVisible(true)}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LoginScreen visible={isLoginModalVisible} onClose={() => setIsLoginModalVisible(false)} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 300,
    marginBottom: 300,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
  button: {
    width: '50%',
    marginBottom: 20,
    backgroundColor: '#488420',
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
