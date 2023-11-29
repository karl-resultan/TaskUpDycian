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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const addTaskDisplay = showAddTask ? {'display': 'block'} : {'display': 'none'};

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
      const response = await fetch('http://192.168.100.99:8000/create_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            'task_description': text,
            'task_type': taskType,
            'due_date': `${due_date} ${time}`,
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
      const response = await fetch(`http://192.168.100.99:8000/get_tasks?id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);

        if (responseData.response == 'task created'){
          closeAddTaskSection();
          setText('');
          Keyboard.dismiss();
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={tasksStyles.linearGradient}>
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

            <Pressable onPress={() => openAddTaskSection()}>
              <View style={tasksStyles.addTaskButton}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>+</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={[tasksStyles.addTaskSection, addTaskDisplay]}>
          <Text style={{ marginTop: '10%', marginBottom: '5%', fontWeight: 'bold' }}>Add Task</Text>

          <TextInput 
            textAlignVertical='top'
            multiline={true}
            numberOfLines={5}
            style={tasksStyles.taskSectionTextWall} 
            placeholder='Enter task details...'
            defaultValue={text}
            onChangeText={taskText => setText(taskText)}
          />
          <Text style={{ marginTop: 10 }}>Task Due Date: {due_date.toDateString()} {time.toLocaleTimeString()}</Text>

          <View style={tasksStyles.addTaskSectionBottom}>
            <View style={tasksStyles.bottomSectionElems}>
              <Pressable onPress={() => { setTaskType('Activities'); console.log('Set to activities')}}>
                <Text>Activities</Text>
              </Pressable>

              <Pressable onPress={() => { setTaskType('Exams'); console.log('Set to exams')}}>
                <Text>Exams</Text>
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
              <Image style={tasksStyles.icon} source={require('./assets/icons8-book-48.png')}/>
            </Pressable>

            <Pressable style={tasksStyles.bottomSectionElems} onPress={() => {setTimePickerVisibility(true)}}>
              <Image style={tasksStyles.icon} source={require('./assets/icons8-book-48.png')}/>
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
    },

    addTaskSection: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: '30%',
      width: '90%',
      height: '60%',
      padding: '5%',
      backgroundColor: '#F4F5DB',
      alignItems: 'center',
      borderRadius: 10,
      shadowRadius: 5,
      zIndex: 10,
      elevation: 5,
    },

    taskSectionTextWall: {
      height: '50%',
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