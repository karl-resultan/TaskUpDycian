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
import PageBottom from './PageBottom';


function Profile({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={profileStyles.linearGradient}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
        <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={profileStyles.mainContainer}>
        <View style={profileStyles.mainViewContainer}>
          <View style={{ flexDirection: 'row', width: '100%', height: '80%' }}>
            <View style={profileStyles.leftSection}>
                <View></View>
                <Pressable style={profileStyles.profileButton}>
                    <Text>Info</Text>
                </Pressable>
                <Pressable style={profileStyles.profileButton}>
                    <Text>Edit</Text>
                </Pressable>
            </View>

            <View style={profileStyles.rightSection}>
                <Text style={profileStyles.sectionHeading}>About Me</Text>
                <Text style={profileStyles.profileText}>College Department</Text>
                <Text style={profileStyles.profileText}>School</Text>
                <Text style={profileStyles.profileText}>Name</Text>
                <Text style={profileStyles.profileText}>Birthday</Text>

                <Text style={profileStyles.sectionHeading}>Contact Information</Text>
                <Text style={profileStyles.profileText}>Email</Text>
                <Text style={profileStyles.profileText}>Phone</Text>
            </View>
          </View>
        </View>
      </View>

      <PageBottom />
    </LinearGradient>
  );
}

const profileStyles = StyleSheet.create({
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
      height: '100%',
      width: '100%',
      alignItems: 'center',
      marginTop: '10%'
    },

    leftSection: {
        width: '30%',
        alignItems: 'center',
        marginRight: '5%'
    },

    profileButton: {
        width: '80%',
        backgroundColor: '#ADD6F5',
        marginTop: '3%',
        marginBottom: '3%',
        alignItems: 'center'
    },

    rightSection: {
        padding: '5%',
        width: '65%',
        backgroundColor: 'white'
    },

    sectionHeading: {
        marginTop: '5%',
        fontSize: 18,
        fontWeight: 'bold'
    },

    profileText: {
        marginTop: '3%',
        marginBottom: '3%',
    }
});

export default Profile;