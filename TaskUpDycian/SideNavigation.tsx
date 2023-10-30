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


function SideNavigation({navigation}: {navigation: any}): JSX.Element {
    function accessTasks(){
        navigation.navigate('Tasks');
    }

  return (
    <View style={sideNavigationStyles.mainContainer}>
        <View style={sideNavigationStyles.menuContainer}>
            <Text style={sideNavigationStyles.sideNavText}>MENU</Text>
        </View>

        <View style={{ marginTop: '10%', marginBottom: '10%' }}>
            <Pressable style={sideNavigationStyles.sideNavLink} onPress={() => accessTasks()}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                <Text>Task</Text>
            </Pressable>

            <Pressable style={[sideNavigationStyles.sideNavLink, sideNavigationStyles.taskSubCategories]}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                <Text>Activities</Text>
            </Pressable>

            <Pressable style={[sideNavigationStyles.sideNavLink, sideNavigationStyles.taskSubCategories]}>
                <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
                <Text>Exams</Text>
            </Pressable>
        </View>

        {/* BOTTOM NAV LINKS */}
        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Notes</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Task Overview</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Profile</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Calendar</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Feedback</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>FAQ</Text>
        </Pressable>

        <Pressable style={sideNavigationStyles.sideNavLink}>
            <Image style={sideNavigationStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            <Text>Settings</Text>
        </Pressable>
    </View>
  );
}

const sideNavigationStyles = StyleSheet.create({
    mainContainer: {
        top: 0,
        left: -15,
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '60%',
        zIndex: 3,
    },

    menuContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '15%',
        width: '100%',
        backgroundColor: '#0E90D5'
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
        width: 40
    },

    sideNavLink: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default SideNavigation;