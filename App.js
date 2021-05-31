// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from './screens/Accounts';
import Products from './screens/Products';
import LoadingScreen from './screens/LoadingScreen'
import Profile from './screens/Profile';
import HomeScreen from './screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignupScreen from './screens/Signup';
import SignInScreen from './screens/Signin';

const Stack = createStackNavigator();

const MainStack = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function Personal() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainStackScreens} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

function MainStackScreens() {
  return (
    <MainStack.Navigator tabBarOptions={{
      showLabel:false,
      tabStyle:{},
      style:{height:59},
      activeTintColor:'black'
    }} >
      <MainStack.Screen options={{
          tabBarLabel: 'ddd',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={31} style={{paddingTop:15,paddingBottom:15}}/>
          ),
        }} name="Home" component={HomeScreen} />
        <MainStack.Screen options={{
          tabBarLabel: 'ddd',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fire" color={color} size={31} style={{paddingTop:15,paddingBottom:15}}/>
          ),
        }} name="Second" component={HomeScreen} />
      <MainStack.Screen
      options={{
        tabBarLabel: 'ddd',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bank" color={color} size={31} style={{paddingTop:15,paddingBottom:15}} />
        ),
      }} tabBar name="Accounts" component={AccountScreen} />
      <MainStack.Screen options={{
          tabBarLabel: 'jjj',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={31} style={{paddingTop:15,paddingBottom:15}} />
          ),
        }} name="Products" component={Products} />
      <MainStack.Screen options={{
          tabBarLabel: 'jjj',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping-music" color={color} size={31} style={{paddingTop:15,paddingBottom:15}} />
          ),
        }} name="Fifth" component={Products} />
    </MainStack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen  name="MainNav" component={Personal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;