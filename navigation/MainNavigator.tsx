import React from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../Homescreen';
import DashboardScreen from '../screens/DashboardScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SetupScreen from '../screens/SetupScreen';
import CropRecommendScreen from '../screens/CropRecommend';
import IrrigationRecommendScreen from '../screens/IrrigationRecommend';
import PestControlScreen from '../screens/PestControl';
import FertilizerRecommendScreen from '../screens/FertilizerRecommend';
import { Feather } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { AlignCenter } from 'react-native-feather';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



  
function Tabs() {
    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#fff',
            height:60,
            borderTopWidth: 0,
         
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            shadowOffset: { width: 0, height: 0 }, // Remove shadow on iOS
            shadowRadius: 0, // Remove shadow on iOS
        },
    }} >
        <Tab.Screen name="Dashboard" component={DashboardScreen}  options={{ headerShown: false ,tabBarLabel:'', tabBarIcon: ({ focused }) => (
                        <View style={[
                            styles.iconContainer,
                            { backgroundColor: focused ? '#488420' : '#fff' }
                        ]}>
                            <Feather name="home" size={30} color={focused ? '#fff' : '#333'} />
                        </View>
                    )}}  />
        <Tab.Screen name="Marketplace" component={MarketplaceScreen}  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={[
                            styles.iconContainer,
                            { backgroundColor: focused ? '#488420' : '#fff' }
                        ]}>
                            <Feather name="shopping-bag" size={30} color={focused ? '#fff' : '#333'} />
                        </View>
                    )
                }} />
        <Tab.Screen name="Notifications" component={NotificationsScreen}  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={[
                            styles.iconContainer,
                            { backgroundColor: focused ? '#488420' : '#fff' }
                        ]}>
                            <Feather name="pie-chart" size={30} color={focused ? '#fff' : '#333'} />
                        </View>
                    )
                }}/>
        <Tab.Screen name="Profile" component={ProfileScreen}  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={[
                            styles.iconContainer,
                            { backgroundColor: focused ? '#488420' : '#fff' }
                        ]}>
                            <Feather name="user" size={30} color={focused ? '#fff' : '#333'} />
                        </View>
                    )
                }}/>
      </Tab.Navigator>
    );
  }
  function MainNavigator() {
    return (
    
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='Setup' component={SetupScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs}  options={{ headerShown: false }} />
        <Stack.Screen name="Recommend" component={CropRecommendScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Irrigation" component={IrrigationRecommendScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Pest" component={PestControlScreen}  options={{ headerShown: false }} />

        <Stack.Screen name="Fertilizer" component={FertilizerRecommendScreen}  options={{ headerShown: false }} />

        </Stack.Navigator>
    
    );
  }
  const styles = StyleSheet.create({
   
    icon: {
      
     
    },
    iconContainer: {
      padding: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
  },
   

  });

export default MainNavigator;