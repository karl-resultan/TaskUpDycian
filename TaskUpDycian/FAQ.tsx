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


function FAQ({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={faqStyles.linearGradient}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
        <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>
        
      <View style={faqStyles.mainContainer}>
        <Text style={faqStyles.pageHeader}>FAQ</Text>
        <View style={faqStyles.section}>
            <Text>The phone cannot receive notifications and reminders.</Text>
        </View>

        <View style={faqStyles.section}>
            <Text>There is no sound for reminders.</Text>
        </View>

        <View style={faqStyles.section}>
            <Text>Other issues</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const faqStyles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      width: '100%',
      flex: 1,
      alignItems: 'center'
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
        fontSize: 22,
        color: 'white',
        marginTop: '10%'
    },

    section: {
        height: '15%',
        width: '95%',
        marginTop: '5%',
        marginBottom: '5%',
        padding: '3%',
        backgroundColor: '#D9D9D9',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
});

export default FAQ;