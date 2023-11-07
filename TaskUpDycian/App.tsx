/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  Pressable
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import BasePage from './BasePage';
import Dashboard from './Dashboard';
import SideNavigation from './SideNavigation';
import Tasks from './Tasks';
import TaskOverview from './TaskOverview';
import Profile from './Profile';
import Settings from './Settings';
import FAQ from './FAQ';
import AboutUs from './AboutUs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="BasePage" component={BasePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="SideNavigation" component={SideNavigation} />
        <Stack.Screen name="TaskOverview" component={TaskOverview} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
