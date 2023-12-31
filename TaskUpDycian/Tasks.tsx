import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';

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
  Keyboard
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from './UserContext';

function Tasks({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [due_date, setDueDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [taskType, setTaskType] = useState('Activities');
  const { userId, setUser } = useUser();

  // DYNAMIC CONTENT LOADING
  const [activities, setActivities] = useState([]);
  const [exams, setExams] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addTaskDisplay = showAddTask ? {'display': 'block'} : {'display': 'none'};
  const [pressedButton, setPressedButton] = useState('');

  const textStyles = (textNum: any) => ({
    color: pressedButton === `button${textNum}` ? '#3498db' : '#000',
  });

  function openAddTaskSection(){
    setShowAddTask(true);
    setText('');
  }

  function closeAddTaskSection(){
    setShowAddTask(false);
    setText('');
    Keyboard.dismiss();
  }

  async function createNewTask(){
    try {
      // const response = await fetch('http://192.168.100.99:8000/create_task', {
      const response = await fetch('https://task-up-dycian.onrender.com/create_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            'task_description': text,
            'task_type': taskType,
            'due_date': `${due_date.getMonth() + 1}-${due_date.getDate()}-${due_date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`,
            'task_owner': userId
          }
        ),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);

        if (responseData.response == 'task created'){
          closeAddTaskSection();
          setText('');
          Keyboard.dismiss();
          getTasks();
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  async function getTasks(){
    try {
      // const response = await fetch(`http://192.168.100.99:8000/get_tasks?id=${userId}`, {
      const response = await fetch(`https://task-up-dycian.onrender.com/get_tasks?id=${userId}`, {
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
          setCompleted(responseData.completed);
          
          console.log(completed);
          // activities.forEach((activity) => {
          //   console.log(activity.due_date);
          //   scheduleAlarm();
          // });

          // exams.forEach((exam) => {
          //   console.log(exam.due_date);
          //   scheduleAlarm();
          // });
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  async function markComplete(taskId: number){
    try {
      // const response = await fetch(`http:192.168.100.99:8000/mark_complete`, {
      const response = await fetch(`https://task-up-dycian.onrender.com/mark_complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            'id': userId,
            'task_id': taskId
          }
        ),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);

        if (responseData.response == 'task completed.'){
          console.log('Task successfully marked complete.');
          setActivities(responseData.activities);
          setExams(responseData.exams);
          setCompleted(responseData.completed);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  const scheduleAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'channel_id',
      title: 'My Notification',
      message: 'This is a local notification',
      date: new Date(Date.now() + 10 * 1000),
      userInfo: {},
      playSound: true,
      soundName: 'default',
      vibrate: true,
      vibration: 300,
    });
  };

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={tasksStyles.linearGradient}>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>
      <View style={tasksStyles.mainContainer}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>

        <View style={tasksStyles.mainViewContainer}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, marginTop: '5%'}}>TASK</Text>

          <View style={{ flexDirection: 'row', height: '12%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Pressable style={tasksStyles.taskCategory} onPress={() => setSelectedCategory('All')}>
              <Text style={{ color: 'black' }}>All</Text>
            </Pressable>

            <Pressable style={tasksStyles.taskCategory} onPress={() => setSelectedCategory('Activities')}>
              <Text style={{ color: 'black' }}>Activities</Text>
            </Pressable>

            <Pressable style={tasksStyles.taskCategory} onPress={() => setSelectedCategory('Exams')}>
              <Text style={{ color: 'black' }}>Exams</Text>
            </Pressable>

            <Pressable style={tasksStyles.taskCategory} onPress={() => setSelectedCategory('Completed')}>
              <Text style={{ color: 'black' }}>Completed</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ height: 350, marginTop: 20, paddingBottom: 30, width: '100%', alignItems: 'center' }}>
            <View style={
                selectedCategory === 'Activities' ? tasksStyles.maxSection : 
                selectedCategory === 'Exams' ? tasksStyles.hideSection :
                selectedCategory === 'Completed' ? tasksStyles.hideSection :
                selectedCategory === 'All' ? tasksStyles.section : {}
              }>
                <Text style={tasksStyles.sectionHeader}>Activities</Text>

                <ScrollView contentContainerStyle={{ marginTop: 20, paddingBottom: 30, width: '95%', alignItems: 'center' }}>
                  {activities.map((activity) => (
                    <View key={activity.id} style={tasksStyles.task}>
                      <Text style={{ color: 'black', fontSize: 20 }}>{activity.task_description}</Text>
                      <Text style={{ color: 'black' }}>Due Date: {activity.due_date}</Text>

                      {!activity.is_completed && ( 
                        <Pressable onPress={() => {markComplete(activity.id)}}>
                          <Text style={{ color: 'black' }}>Mark as Complete</Text>
                        </Pressable>
                      )}

                      {activity.is_completed && (
                        <Text>Completed</Text>
                      )}
                    </View>
                  ))}
                </ScrollView>              

                {/* <Text>No activities as of now.</Text> */}
              </View>

              <View style={
                selectedCategory === 'Activities' ? tasksStyles.hideSection : 
                selectedCategory === 'Exams' ? tasksStyles.maxSection :
                selectedCategory === 'Completed' ? tasksStyles.hideSection :
                selectedCategory === 'All' ? tasksStyles.section : {}
              }>
                <Text style={tasksStyles.sectionHeader}>Exams</Text>
                
                <ScrollView contentContainerStyle={{ marginTop: 20, paddingBottom: 30, width: '95%', alignItems: 'center' }}>
                  {exams.map((exam) => (
                    <View key={exam.id} style={tasksStyles.task}>
                      <Text style={{ color: 'black', fontSize: 20 }}>{exam.task_description}</Text>
                      <Text style={{ color: 'black' }}>Due Date: {exam.due_date}</Text>

                      {!exam.is_completed && (
                        <Pressable onPress={() => {markComplete(exam.id)}}>
                          <Text style={{ color: 'black' }}>Mark as Complete</Text>
                        </Pressable>
                      )}

                      {exam.is_completed && (
                        <Text>Completed</Text>
                      )}
                    </View>
                  ))}
                </ScrollView>   
              </View>

              <View style={
                selectedCategory === 'Activities' ? tasksStyles.hideSection : 
                selectedCategory === 'Exams' ? tasksStyles.hideSection :
                selectedCategory === 'Completed' ? tasksStyles.maxSection :
                selectedCategory === 'All' ? tasksStyles.hideSection : {}
              }>
                <Text style={tasksStyles.sectionHeader}>Completed Tasks</Text>
                
                <ScrollView contentContainerStyle={{ marginTop: 20, paddingBottom: 30, width: '95%', alignItems: 'center' }}>
                  {completed.map((complete) => (
                    <View key={complete.id} style={tasksStyles.task}>
                      <Text style={{ color: 'black', fontSize: 20 }}>{complete.task_description}</Text>
                      <Text style={{ color: 'black' }}>Due Date: {complete.due_date}</Text>

                      <Text>Completed</Text>
                    </View>
                  ))}
                </ScrollView>   
              </View>
          </ScrollView>

          <Pressable onPress={() => openAddTaskSection()}>
            <View style={tasksStyles.addTaskButton}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>+</Text>
            </View>
          </Pressable>
        </View>

        <View style={[tasksStyles.addTaskSection, addTaskDisplay]}>
          <Text style={{ marginTop: '10%', marginBottom: '5%', fontWeight: 'bold', color: 'black' }}>Add Task</Text>

          <TextInput 
            textAlignVertical='top'
            multiline={true}
            numberOfLines={5}
            style={tasksStyles.taskSectionTextWall} 
            placeholder='Enter task details...'
            defaultValue={text}
            onChangeText={taskText => setText(taskText)}
            placeholderTextColor={'black'}
          />
          <Text style={{ marginTop: 10, color: 'black' }}>Task Due Date: {due_date.toDateString()} {time.toLocaleTimeString()}</Text>

          <View style={tasksStyles.addTaskSectionBottom}>
            <View style={tasksStyles.bottomSectionElems}>
              <Pressable onPress={() => { setPressedButton('button1'); setTaskType('Activities'); console.log('Set to activities')}}>
                <Text style={textStyles(1)}>Activities</Text>
              </Pressable>

              <Pressable onPress={() => { setPressedButton('button2'); setTaskType('Exams'); console.log('Set to exams')}}>
                <Text style={textStyles(2)}>Exams</Text>
              </Pressable>
            </View>

            {isDatePickerVisible && (
              <DateTimePicker
                  value={due_date}
                  mode='date'
                  is24Hour={true}
                  display='default'
                  onChange={(event, date) => {setDueDate(date); setDatePickerVisibility(false)}}
              />
            )}

            {isTimePickerVisible && (
              <DateTimePicker
                  value={time}
                  mode='time'
                  is24Hour={true}
                  display='default'
                  onChange={(event, time) => {setTime(time); setTimePickerVisibility(false)}}
              />
            )}

            <Pressable style={tasksStyles.bottomSectionElems} onPress={() => {setDatePickerVisibility(true)}}>
              <Image style={tasksStyles.icon} source={require('./assets/calendar.png')}/>
            </Pressable>

            <Pressable style={tasksStyles.bottomSectionElems} onPress={() => {setTimePickerVisibility(true)}}>
              <Image style={tasksStyles.icon} source={require('./assets/clock.png')}/>
            </Pressable>

            <Pressable style={tasksStyles.bottomSectionElems} onPress={() => closeAddTaskSection()}><Text style={tasksStyles.addTaskSectionBottomText}>Cancel</Text></Pressable>
            <Pressable style={tasksStyles.bottomSectionElems} onPress={() => createNewTask()}><Text style={tasksStyles.addTaskSectionBottomText}>Done</Text></Pressable>
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
      alignItems: 'center',
    },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },

    mainViewContainer: {
      width: '100%',
    },

    tasksContainer: {
      height: '60%',
      maxHeight: '80%',
      width: '100%'
    },

    taskCategory: {
      margin: '1.5%',
      width: '23%',
      height: '30%',
      borderRadius: 100,
      backgroundColor: '#fdc500',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3
    },

    maxSection: {
      height: '80%',
      width: '100%',
      marginBottom: '5%',
      backgroundColor: '#D9D9D9',
      elevation: 3,
      borderRadius: 15
    },

    hideSection: {
      display: 'none'
    },

    section: {
      height: '50%',
      width: '100%',
      marginBottom: '5%',
      backgroundColor: '#D9D9D9',
      elevation: 3,
      borderRadius: 15
    },

    sectionHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#00296b',
      marginLeft: 15
    },

    task: {
      marginTop: '5%',
      marginBottom: '5%',
      backgroundColor: 'white',
      padding: '3%',
      minHeight: 80,
      width: '90%',
      borderRadius: 15,
      elevation: 6
    },

    addTaskButton: {
      marginTop: '3%',
      height: 40,
      width: 40,
      borderRadius: 150,
      backgroundColor: '#fdc500',
      alignItems: 'center',
      alignSelf: 'center'
    },

    addTaskSection: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: '10%',
      width: '90%',
      height: '75%',
      overflow: 'scroll',
      padding: '5%',
      backgroundColor: '#F4F5DB',
      alignItems: 'center',
      borderRadius: 10,
      shadowRadius: 5,
      zIndex: 10,
      elevation: 5,
    },

    taskSectionTextWall: {
      height: '30%',
      width: '100%',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#D9D9D9',
      color: 'black'
    },

    icon: {
      height: 30,
      width: 30
    },

    addTaskSectionBottom: {
      height: '30%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    bottomSectionElems: {
      margin: 10
    },
    
    addTaskSectionBottomText: {
      color: '#2397EC',
      fontWeight: 'bold',
      fontSize: 19
    }
});

export default Tasks;