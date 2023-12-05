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
  Keyboard
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from './UserContext';

function CreateNote({navigation}: {navigation: any}): JSX.Element {
    const [sharedState, setSharedState] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDetails, setNoteDetails] = useState('');
    const [due_date, setDueDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [current_time, setCurrentTime] = useState(processTime(new Date));
    const { userId, setUser } = useUser();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    function processTime(time: Date){
        const split = time.getHours() >= 12 ? 'PM' : 'AM';
        const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        const formattedMinutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();

        return `${hours}:${formattedMinutes}${split}`;
    }

    async function sendNoteData(){
      const note = {
        'note_title': noteTitle,
        'note_description': noteDetails,
        'note_due': `${due_date.getMonth() + 1}-${due_date.getDate()}-${due_date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`,
        'note_owner': userId
      }
  
      try {
        console.log(note.note_description);
        console.log(note.note_owner);
  
        const response = await fetch('https://task-up-dycian.onrender.com/create_note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'note created.'){
            setNoteDetails('');
            setNoteTitle('');
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    return (
    <LinearGradient colors={['#00296b', '#00509d']} style={noteCreationStyles.linearGradient}>
      <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={noteCreationStyles.mainContainer}>
        <View style={{ marginBottom: '5%', marginTop: '5%' }}>
          <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>CREATE NOTE</Text>
        </View>

        <View>
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
                  onChange={(event, time) => {setTime(time); setTimePickerVisibility(false), setCurrentTime(processTime(time))}}
              />
            )}

            <Text style={noteCreationStyles.sectionTitle}>Note Title</Text>
            <TextInput defaultValue={noteTitle} onChangeText={title => setNoteTitle(title)} style={noteCreationStyles.inputField} placeholder='Enter note title...'/>

            <Text style={noteCreationStyles.sectionTitle}>Description</Text>
            <TextInput 
                textAlignVertical='top'
                multiline={true}
                numberOfLines={5}
                defaultValue={noteDetails}
                onChangeText={detail => setNoteDetails(detail)} 
                style={noteCreationStyles.textarea} 
                placeholder='Enter note description...'
            />

            <Pressable style={{ marginTop: 7, marginBottom: 15}} onPress={() => setDatePickerVisibility(true)}>
                <View style={noteCreationStyles.section}>
                    <Image style={noteCreationStyles.icon} source={require('./assets/due-date.png')}/>
                    <View>
                        <Text style={noteCreationStyles.sectionTitle}>Due Date</Text>
                        <Text>{`${due_date.getDate()} / ${due_date.getMonth()} / ${due_date.getFullYear()}`}</Text>
                    </View>
                </View>
                <View style={noteCreationStyles.sectionDivider}></View>
            </Pressable>

            <Pressable style={{ marginTop: 7, marginBottom: 15}} onPress={() => setTimePickerVisibility(true)}>
                <View style={noteCreationStyles.section}>
                    <Image style={noteCreationStyles.icon} source={require('./assets/bell.png')}/>
                    <View>
                        <Text style={noteCreationStyles.sectionTitle}>Time / Reminder</Text>
                        <Text>{current_time}</Text>
                    </View>
                </View>
                <View style={noteCreationStyles.sectionDivider}></View>
            </Pressable>

            <Pressable style={{ marginTop: 7, marginBottom: 15}}>
                <View style={noteCreationStyles.section}>
                    <Image style={noteCreationStyles.icon} source={require('./assets/attach-file.png')}/>
                    <Text style={noteCreationStyles.sectionTitle}>Attachment</Text>
                </View>
                <View style={noteCreationStyles.sectionDivider}></View>
            </Pressable>

            <Pressable style={noteCreationStyles.createNoteButton} onPress={() => {sendNoteData(), navigation.navigate('Dashboard')}}>
                <Text style={{ fontWeight: 'bold' }}>Create Note</Text>
            </Pressable>
        </View>
      </View>
    </LinearGradient>
    );
}

const noteCreationStyles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },

    mainContainer: {
      height: '100%',
      width: '100%',
      flex: 1,
    },
  
    gradient: {
      width: '100%',
      height: '100%'
    },

    sectionTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    sectionDivider: {
        height: 2,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white',
        opacity: .3
    },

    inputField: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        color: 'black',
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },

    textarea: {
        marginTop: 10,
        marginBottom: 15,
        paddingLeft: 15,
        color: 'black',
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },

    icon: {
        height: 30,
        width: 30,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2
    },

    createNoteButton: {
        height: '8%',
        width: '40%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#fdc500',
        borderRadius: 10
    }
  });

  export default CreateNote;