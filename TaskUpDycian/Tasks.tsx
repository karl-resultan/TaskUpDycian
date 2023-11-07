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


function Tasks({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);

  return (
    <LinearGradient colors={['#02F5A5', '#01DBF1']} style={tasksStyles.linearGradient}>
      <View style={tasksStyles.mainContainer}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
        <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

        <View style={tasksStyles.mainViewContainer}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, marginTop: '5%'}}>TASK</Text>

          <View style={{ flexDirection: 'row', height: '12%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Pressable style={tasksStyles.taskCategory}>
              <Text>All</Text>
            </Pressable>

            <Pressable style={tasksStyles.taskCategory}>
              <Text>Activities</Text>
            </Pressable>

            <Pressable style={tasksStyles.taskCategory}>
              <Text>Exams</Text>
            </Pressable>
          </View>

          <View style={{ height: '73%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <View style={tasksStyles.section}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Activities</Text>
              <Text>No activities as of now.</Text>
            </View>

            <View style={tasksStyles.section}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Exams</Text>
              <Text>No exams.</Text>
            </View>

            <Text>No schedule for the day. Click + to create a task.</Text>

            <Pressable>
              <View style={tasksStyles.addTaskButton}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>+</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const tasksStyles = StyleSheet.create({
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

export default Tasks;