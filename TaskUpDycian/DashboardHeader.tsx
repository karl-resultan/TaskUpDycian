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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 50, width: 50 }} source={require('./assets/school-logo.png')}/>
                <Text style={{ color: 'white' }}>Dr. Yanga's Colleges Inc.</Text>
            </View>
        </View>
    );
}

const dashboardHeaderStyles = StyleSheet.create({
    mainNavigation: {
        width: '100%',
        marginTop: '7.5%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
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