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
import BasePage from './BasePage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Welcome({navigation}: {navigation: any}): JSX.Element {
  return(
    <LinearGradient colors={['#02F5A5', '#01DBF1']} style={welcomeStyles.linearGradient}>
        <View style={welcomeStyles.mainContainer}>
            <Text style={welcomeStyles.mainText}>Welcome to Task-UP Dycian</Text>

            <View style={welcomeStyles.section}>
                <Text style={welcomeStyles.sectionText}>Create Task Quickly</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Text style={welcomeStyles.sectionText}>Set your schedule as easy as 1, 2, 3</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Text style={welcomeStyles.sectionText}>Task Reminders</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Text style={welcomeStyles.sectionText}>Task Overview</Text>
            </View>

            <Pressable style={welcomeStyles.continueButton} onPress={() => navigation.navigate('BasePage')}>
                <Text style={welcomeStyles.continueButtonText}>Continue</Text>
            </Pressable>
        </View>
    </LinearGradient>
  );
}


const welcomeStyles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },

    mainContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },

    mainText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: '20%',
    },

    section: {
        marginTop: '5%',
        marginBottom: '5%'
    },

    sectionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    continueButton: {
        height: 35,
        width: '80%',
        marginTop: '10%',
        borderRadius: 15,
        backgroundColor: '#0D6EFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    continueButtonText: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
});

export default Welcome;