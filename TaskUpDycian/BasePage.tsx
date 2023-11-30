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
import PageBottom from './PageBottom';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function BasePage({navigation}: {navigation: any}): JSX.Element {
  return(
    <LinearGradient colors={['#00296b', '#00509d']} style={welcomeStyles.linearGradient}>
        <View style={welcomeStyles.mainContainer}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
                <Text style={welcomeStyles.topText}>Task-UP: Dycian</Text>

                <Pressable style={welcomeStyles.getStarted} onPress={() => navigation.navigate('Register')}>
                    <Text style={welcomeStyles.getStartedText}>Get Started</Text>
                </Pressable>
            </View>

            <View style={welcomeStyles.section}>
                <Image style={{ height: 150, width: 150, marginRight: 10, marginLeft: 50 }} source={require('./assets/welcome.png')}/>
                <View style={{ width: '60%', marginLeft: '5%' }}>
                    <Text style={welcomeStyles.centerText}>Task-UP Dycian: To-Do List App</Text>
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: '5%', marginBottom: '15%' }}>
                <Pressable style={[welcomeStyles.continueButton, welcomeStyles.bottomContent]} onPress={() => navigation.navigate('Login')}>
                    <Text style={[welcomeStyles.continueButtonText, welcomeStyles.bottomContent]}>Login</Text>
                </Pressable>
                
                <Image style={{ height: 45, width: 45, marginRight: 10, marginLeft: 15 }} source={require('./assets/icons8-facebook-48.png')}/>
                <Text style={{ color: 'white' }}>Visit our Page!</Text>
            </View>

            <PageBottom></PageBottom>
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
        alignItems: 'center',
    },

    topText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: '5%',
        color: 'white'
    },

    centerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: '20%',
        color: 'white'
    },

    section: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10%',
        marginBottom: '2%'
    },

    sectionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    getStarted: {
        height: 35,
        width: '30%',
        borderRadius: 15,
        backgroundColor: '#fdc500',
        justifyContent: 'center',
        alignItems: 'center',
    },

    getStartedText: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    continueButton: {
        height: 35,
        width: '30%',
        borderRadius: 15,
        backgroundColor: '#fdc500',
        justifyContent: 'center',
        alignItems: 'center',
    },

    continueButtonText: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    facebookLogo: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#FFFFFF'
    },

    bottomContent: {
        marginLeft: '5%',
        marginRight: '5%'
    }
});

export default BasePage;
