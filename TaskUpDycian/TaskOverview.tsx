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


function TaskOverview({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);

  return (
    <LinearGradient colors={['#02F5A5', '#01DBF1']} style={taskOverviewStyles.linearGradient}>
      <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={taskOverviewStyles.mainContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>TASK OVERVIEW</Text>

        <View style={taskOverviewStyles.mainContent}>
            <View>
                <View></View>
                <Text style={taskOverviewStyles.studentName}>Student Name</Text>
            </View>

            <View style={{ flexDirection: 'row', height: '15%' }}>
                <View style={taskOverviewStyles.taskCount}>
                    <Text style={taskOverviewStyles.taskCountText}>0</Text>
                    <Text>Completed Tasks</Text>
                </View>

                <View style={taskOverviewStyles.taskCount}>
                    <Text style={taskOverviewStyles.taskCountText}>0</Text>
                    <Text>Pending Task</Text>
                </View>
            </View>

            <View style={[taskOverviewStyles.centerSection, taskOverviewStyles.dailyTasks]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Completion of Daily Tasks</Text>
                    <Text>Sample Date</Text>
                </View>

                <View>
                    <Text>No Tasks.</Text>
                </View>
            </View>

            <View style={taskOverviewStyles.centerSection}>
                <Text>Tasks for the next 7 days</Text>
            </View>

            <View style={[taskOverviewStyles.centerSection, taskOverviewStyles.tasksByCategory]}>
                <Text>Pending Tasks in Categories</Text>
            </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const taskOverviewStyles = StyleSheet.create({
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

    mainContent: {
        height: '90%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: '5%'
    },

    studentName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '7.5%',
        marginBottom: '7.5%'
    },

    taskCount: {
        height: '100%',
        width: '45%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    taskCountText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black'
    },

    centerSection: {
        height: '10%',
        width: '95%',
        marginTop: '2.5%',
        marginBottom: '2.5%',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    dailyTasks: {
        height: '30%'
    },

    tasksByCategory: {
        height: '20%'
    }
});

export default TaskOverview;