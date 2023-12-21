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
  Pressable,
  Keyboard,
  ImageBackground
} from 'react-native';

import { useUser } from './UserContext';
import { useNavigation } from '@react-navigation/native';

function Selection({navigation}: {navigation: any}): JSX.Element {
    const navigator = useNavigation();

    const [sharedState, setSharedState] = useState(false);
    const { userId, setUser } = useUser();

    return (
        <ImageBackground source={require('./assets/bg.png')} style={selectionStyles.bg}>
            <View style={selectionStyles.mainContainer}>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Image style={selectionStyles.image} source={require('./assets/db1.png')}/>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Tasks')}>
                    <Image style={selectionStyles.image} source={require('./assets/db2.png')}/>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const selectionStyles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: 'cover',
    },

    mainContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    image: {
        height: 270,
        width: 270,
        margin: -100
    }
  });

  export default Selection;