import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTabBar from './CustomTabBar';
//
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;
