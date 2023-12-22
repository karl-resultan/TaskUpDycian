import React from 'react';
import { useState } from 'react';
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
  Pressable,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';


function Settings({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={settingsStyles.linearGradient}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
        <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={settingsStyles.mainContainer}>
        <Text style={settingsStyles.pageHeader}>Settings</Text>

        <View style={settingsStyles.mainContent}>
            <View>
                <Text style={settingsStyles.contentSection}>Customize</Text>
                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Notification and Reminder</Text>
                </Pressable>

                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Theme</Text>
                </Pressable>

                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Task Completion Tone</Text>
                </Pressable>
            </View>

            <View>
                <Text style={settingsStyles.contentSection}>Date and Time</Text>
                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Time Format</Text>
                    <Text>System Default</Text>
                </Pressable>

                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Date Format</Text>
                    <Text>Sample Date</Text>
                </Pressable>

                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Task Reminder Default</Text>
                    <Text>1 hour before</Text>
                </Pressable>
            </View>

            <View>
                <Text style={settingsStyles.contentSection}>About</Text>
                <Pressable style={settingsStyles.settingsButton}>
                    <Text>Privacy Policy</Text>
                </Pressable>

                <Pressable style={settingsStyles.settingsButton}>
                    <Text>About Us</Text>
                </Pressable>
            </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const settingsStyles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      width: '100%',
      flex: 1,
    },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },

    mainViewContainer: {
      width: '100%',
    },

    pageHeader: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },

    mainContent: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: '10%',
        marginTop: '3%',
        backgroundColor: 'white'
    },

    contentSection: {
        marginTop: '2%',
        marginBottom: '2%',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },

    settingsButton: {
        marginTop: '2%',
        marginBottom: '2%'
    }
});

export default Settings;