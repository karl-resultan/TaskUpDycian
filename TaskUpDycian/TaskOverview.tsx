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
import PieChart from 'react-native-pie-chart';
import { BarChart } from 'react-native-chart-kit';

import { useUser } from './UserContext';


function TaskOverview({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);
  const [activities, setActivities] = useState([]);
  const [exams, setExams] = useState([]);
  const [weekly_tasks, setWeeklyTasks] = useState([]);  
  const [completed, setCompleted] = useState('');
  const [pending, setPending] = useState('');
  const [pendingActs, setPendingActs] = useState('');
  const [pendingExams, setPendingExams] = useState('');
  const [studentName, setStudentName] = useState('');
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState([1, 1])
  const { userId, setUser } = useUser();

  // PIE DATA
  const widthAndHeight = 70
  const sliceColor = ['#fbd203', '#0E90D5']

  // BAR DATA
  const bar_data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        data: [0, 2, 4, 6, 8, 10, 13]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.7    
  };

  async function retrieveUser(){
    const user = {
      'id': userId
    }
  
    try {
      // const response = await fetch('http://192.168.100.99:8000/get_user_data', {
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
        // const response = await fetch(`http://192.168.100.99:8000/get_task_overview?id=${userId}`, {
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
            setPendingActs(responseData.pending_activities);
            setPendingExams(responseData.pending_exams);
            setPieData(responseData.pie_data);
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
                <View>
                    <Text style={{ marginBottom: 10 }}>Completion of Daily Tasks</Text>

                    <BarChart
                      data={bar_data}
                      width={300}
                      height={120}
                      chartConfig={chartConfig}
                      verticalLabelRotation={0}
                    />
                </View>
            </View>

            <View style={taskOverviewStyles.centerSection}>
                <Text>Tasks for the next 7 days</Text>
            </View>

            <View style={[taskOverviewStyles.centerSection, taskOverviewStyles.tasksByCategory]}>
                <Text>Pending Tasks in Categories</Text>

                <View style={taskOverviewStyles.chartContainer}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={pieData}
                    sliceColor={sliceColor}
                  />

                  <View style={{ marginLeft: 40 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <View style={[taskOverviewStyles.chartCateg, taskOverviewStyles.pending]}></View>
                      <Text>Activities: {pendingActs}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <View style={[taskOverviewStyles.chartCateg, taskOverviewStyles.complete]}></View>
                      <Text>Exams: {pendingExams}</Text>
                    </View>
                  </View>
                </View>
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
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 10
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
        marginLeft: '2.2%',
        marginRight: '2.2%',
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
        height: '20%',
        width: '95%',
        marginTop: '4%',
        marginBottom: '1%',
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        elevation: 2
    },

    dailyTasks: {
        height: '30%'
    },

    tasksByCategory: {
        height: '25%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
    },
    
    chartContainer: {
      height: '80%',
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    chartCateg: {
      height: 30,
      width: 30,
      marginRight: 20
    },

    pending: {
      backgroundColor: '#fbd203'
    },

    complete: {
      backgroundColor: '#0E90D5'
    }
});

export default TaskOverview;