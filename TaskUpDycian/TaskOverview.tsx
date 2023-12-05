import React, { useEffect } from 'react';
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

import { useUser } from './UserContext';


function TaskOverview({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);
  const [activities, setActivities] = useState([]);
  const [exams, setExams] = useState([]);
  const [weekly_tasks, setWeeklyTasks] = useState([]);  
  const [completed, setCompleted] = useState('');
  const [pending, setPending] = useState('');
  const [studentName, setStudentName] = useState('');
  const { userId, setUser } = useUser();

  async function retrieveUser(){
    const user = {
      'id': userId
    }
  
    try {
      const response = await fetch('https://task-up-dycian.onrender.com/get_user_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);

        if (responseData.response == 'retrieval success'){
            setStudentName(`${responseData.user_data.first_name} ${responseData.user_data.middle_initial} ${responseData.user_data.last_name}`);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  async function getTaskData() {
    try {
        const response = await fetch(`https://task-up-dycian.onrender.com/get_task_overview?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'tasks retrieved'){
            console.log('Tasks successfully retrieved.');
            
            setActivities(responseData.activities);
            setExams(responseData.exams);
            setWeeklyTasks(responseData.weekly_tasks);
            setCompleted(responseData.completed);
            setPending(responseData.pending);
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
  }

  useEffect(() => {
    retrieveUser();
    getTaskData();
  }, []);

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={taskOverviewStyles.linearGradient}>
      <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={taskOverviewStyles.mainContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>TASK OVERVIEW</Text>

        <View style={taskOverviewStyles.mainContent}>
            <View>
                <View></View>
                <Text style={taskOverviewStyles.studentName}>{studentName}</Text>
            </View>

            <View style={{ flexDirection: 'row', height: '15%' }}>
                <View style={taskOverviewStyles.taskCount}>
                    <Text style={taskOverviewStyles.taskCountText}>{completed}</Text>
                    <Text>Completed Tasks</Text>
                </View>

                <View style={taskOverviewStyles.taskCount}>
                    <Text style={taskOverviewStyles.taskCountText}>{pending}</Text>
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
        marginTop: '5%',
        borderRadius: 10,
        elevation: 3
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
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 2
    },

    dailyTasks: {
        height: '30%'
    },

    tasksByCategory: {
        height: '20%'
    }
});

export default TaskOverview;