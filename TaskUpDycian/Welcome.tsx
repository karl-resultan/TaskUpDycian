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
  Pressable,
  ImageBackground
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Welcome({navigation}: {navigation: any}): JSX.Element {
  return(
    <ImageBackground source={require('./assets/bg.png')} style={welcomeStyles.bg}>
        <View style={welcomeStyles.mainContainer}>
            <Image style={{ height: 180, width: 180 }} source={require('./assets/dashboard-icon.png')} />
            <Text style={welcomeStyles.mainText}>Welcome to Task-UP Dycian</Text>

            <View style={welcomeStyles.section}>
                <Image style={welcomeStyles.icon} source={require('./assets/icons8-task-50.png')}/>
                <Text style={welcomeStyles.sectionText}>Create Task Quickly</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Image style={welcomeStyles.icon} source={require('./assets/icons8-google-calendar-50.png')}/>
                <Text style={welcomeStyles.sectionText}>Set your schedule as easy as 1, 2, 3</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Image style={welcomeStyles.icon} source={require('./assets/bell.png')}/>
                <Text style={welcomeStyles.sectionText}>Task Reminders</Text>
            </View>

            <View style={welcomeStyles.section}>
                <Image style={welcomeStyles.icon} source={require('./assets/icons8-overview-50.png')}/>
                <Text style={welcomeStyles.sectionText}>Task Overview</Text>
            </View>

            <Pressable style={welcomeStyles.continueButton} onPress={() => navigation.navigate('Login')}>
                <Text style={welcomeStyles.continueButtonText}>Continue</Text>
            </Pressable>
        </View>
    </ImageBackground>
  );
}


const welcomeStyles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },

    bg: {
        flex: 1,
        resizeMode: 'cover',
    },

    mainContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },

    mainText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '5%',
        color: 'white'
    },

    icon: {
        height: 35,
        width: 35,
        marginRight: 10
    },

    section: {
        marginTop: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    sectionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },

    continueButton: {
        height: 35,
        width: '80%',
        marginTop: '10%',
        borderRadius: 15,
        backgroundColor: '#fdc500',
        justifyContent: 'center',
        alignItems: 'center',
    },

    continueButtonText: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
});

export default Welcome;
