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
import DateTimePicker from '@react-native-community/datetimepicker';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';
import { Calendar } from 'react-native-calendars';

function ViewCalendar({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState( 'date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState( 'Empty');

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={calendarStyles.linearGradient}>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>
      <View style={calendarStyles.mainContainer}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>

        <Calendar 
          style={{
            borderRadius: 5,
            margin: 12,
            elevation: 5,
            borderWidth: 4,
            width: 380,
            height: 400,
            marginTop: 40,
            borderColor: 'rgba(100, 100, 100, 0.2)'
          }}
          theme={{
            calendarBackground: '#222',
            dayTextColor: '#fff',
            textDisabledColor: '#444',
            monthTextColor: '#888'
          }}
        />
      </View>
    </LinearGradient>
  );
}

const calendarStyles = StyleSheet.create({
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

    taskCategory: {
      margin: '3%',
      width: '25%',
      height: '30%',
      borderRadius: 100,
      backgroundColor: '#ADD6F5',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',      
    },

    section: {
      height: '30%',
      width: '100%',
      marginTop: '5%',
      marginBottom: '5%',
      backgroundColor: '#D9D9D9'
    },

    addTaskButton: {
      marginTop: '5%',
      height: 40,
      width: 40,
      borderRadius: 150,
      backgroundColor: '#ADD6F5',
      alignItems: 'center'
    }
});

export default ViewCalendar;