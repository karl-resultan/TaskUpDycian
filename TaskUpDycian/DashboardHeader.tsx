import React from 'react';
import { useState, useEffect } from 'react';
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

function DashboardHeader({sharedState, setSharedState, navigation}: any): JSX.Element {
    function updateSharedState(){
        console.log('attempting to share state')
        setSharedState(true);
    }

    return (
        <View style={dashboardHeaderStyles.mainNavigation}>
            <Pressable onPress={() => updateSharedState()}>
                <Image style={[dashboardHeaderStyles.mainNavbarIcon, dashboardHeaderStyles.imageGap]} source={require('./assets/icons8-menu-48.png')} />
            </Pressable>
            <View>
            <View></View>
            <Text>Dr. Yanga's Colleges Inc.</Text>
            </View>

            <Pressable>
                <Image style={[dashboardHeaderStyles.mainNavbarIcon, dashboardHeaderStyles.imageGap, dashboardHeaderStyles.mainNavbarRightIcons]} source={require('./assets/icons8-search-64.png')} />
            </Pressable>
            <Pressable>
                <Image style={[dashboardHeaderStyles.mainNavbarIcon, dashboardHeaderStyles.imageGap, dashboardHeaderStyles.mainNavbarRightIcons]} source={require('./assets/icons8-notification-32.png')} />
            </Pressable>
            <View></View>
            <Pressable>
                <Image style={[dashboardHeaderStyles.mainNavbarIcon, dashboardHeaderStyles.imageGap, dashboardHeaderStyles.mainNavbarRightIcons]} source={require('./assets/icons8-arrow-down-48.png')} />
            </Pressable>
        </View>
    );
}

const dashboardHeaderStyles = StyleSheet.create({
    mainNavigation: {
        width: '100%',
        marginTop: '7.5%',
        flexDirection: 'row',
        alignItems: 'center'
      },
  
    mainNavbarIcon: {
        height: 30,
        width: 30
    },

    mainNavbarRightIcons: {
        alignSelf: 'flex-end'
    },

    imageGap: {
        margin: 3
    },
});

export default DashboardHeader;