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

import LinearGradient from 'react-native-linear-gradient';

function SideNavigation({setSharedState, sharedState, navigation}: any): JSX.Element {
    const [isViewVisible, setIsViewVisible] = useState(sharedState);
    const containerDisplay = isViewVisible ? {'display': 'block'} : {'display': 'none'};

    function closeSideNav(){
        setSharedState(false);
        console.log('this is working');
    }

    useEffect(() => {
        // Listen for changes in the shared state and update the local state
        setIsViewVisible(sharedState);
        console.log('currently listening')
      }, [sharedState]);

  return (
    <View style={[sideNavigationStyles.container, containerDisplay]} key='container'>
        <View style={sideNavigationStyles.mainContainer}>
            <LinearGradient colors={['#00296b', '#00509d']} style={sideNavigationStyles.linearGradient}>
                <View style={sideNavigationStyles.menuContainer}>
                    <Text style={sideNavigationStyles.sideNavText}>MENU</Text>
                </View>
            </LinearGradient>

            <View style={{ marginTop: '10%', marginBottom: '10%' }}>
                <Pressable style={sideNavigationStyles.sideNavLink}>
                    <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                    <Text>Task</Text>
                </Pressable>

                <Pressable style={[sideNavigationStyles.sideNavLink, sideNavigationStyles.taskSubCategories]} onPress={() => navigation.navigate('Tasks') }>
                    <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                    <Text>Activities</Text>
                </Pressable>

                <Pressable style={[sideNavigationStyles.sideNavLink, sideNavigationStyles.taskSubCategories]}>
                    <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                    <Text>Exams</Text>
                </Pressable>
            </View>

            {/* BOTTOM NAV LINKS */}
            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('Dashboard') }>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                <Text>Notes</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('TaskOverview')}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-task-50 (1).png')}/>
                <Text>Task Overview</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('Profile')}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-female-profile-50.png')}/>
                <Text>Profile</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('Calendar')}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-google-calendar-50.png')}/>
                <Text>Calendar</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-feedback-50.png')}/>
                <Text>Feedback</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('FAQ')}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-faq-50.png')}/>
                <Text>FAQ</Text>
            </Pressable>

            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => navigation.navigate('Settings')}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-settings-64.png')}/>
                <Text>Settings</Text>
            </Pressable>
        </View>
        <Pressable style={sideNavigationStyles.darkBg} onPress={() => closeSideNav()}></Pressable>
    </View>
  );
}

const sideNavigationStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        display: 'none'
    },

    linearGradient: {
        height: '15%'
    },

    mainContainer: {
        top: 0,
        left: -15,
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '60%',
        zIndex: 9,
    },

    darkBg: {
        height: '100%',
        width: '110%',
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: .5,
        zIndex: 8
    },

    menuContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    sideNavText: {
        fontWeight: 'bold',
        color: 'white'
    },

    taskSubCategories: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '20%',
    },

    icon: {
        height: 40,
        width: 40,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2
    },

    sideNavLink: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default SideNavigation;