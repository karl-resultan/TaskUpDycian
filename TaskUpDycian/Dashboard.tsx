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
import { useUser } from './UserContext';
import { useFocusEffect } from '@react-navigation/native';

function Dashboard({navigation}: {navigation: any}): JSX.Element {
    const [sharedState, setSharedState] = useState(false);
    const [notes, setNotes] = useState([]);
    const { userId, setUser } = useUser();

    async function retrieveNotes(){
      try {
        const response = await fetch(`https://task-up-dycian.onrender.com/get_notes?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'retrieval complete.'){
            console.log(responseData.notes);
            setNotes(responseData.notes);
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    async function deleteNote(note_id: number){
      const note = {
        'id': note_id
      }
  
      try {
        const response = await fetch('https://task-up-dycian.onrender.com/delete_note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'note deleted.'){
            retrieveNotes();
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    useFocusEffect(
      React.useCallback(() => {
        return () => {
          retrieveNotes();
        };
      }, [])
    );

    return (
    <LinearGradient colors={['#00296b', '#00509d']} style={dashboardStyles.linearGradient}>
      <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={dashboardStyles.mainContainer}>
        <View style={{ marginBottom: '5%', marginTop: '5%' }}>
          <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>ALL NOTES</Text>
        </View>

        <View style={dashboardStyles.notesContainer}>
          <TextInput style={dashboardStyles.searchNotes } placeholder='Search notes...'></TextInput>

          <ScrollView contentContainerStyle={{ marginTop: 20, height: 330, width: 350, alignItems: 'center' }}>
            {notes.map((item) => (
              <View key={item.id} style={dashboardStyles.note}>
                <Text style={dashboardStyles.noteTitle}>{item.note_title}</Text>
                <Text style={dashboardStyles.note_due}>{item.due_date}</Text>
                
                <View style={{ flexDirection: 'row' }}>
                  <Pressable style={{ marginRight: 15 }}>
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable style={{ marginRight: 15 }} onPress={() => deleteNote(item.id)}>
                    <Text>Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Pressable style={ dashboardStyles.addNoteButton } onPress={() => navigation.navigate('CreateNote')}>
            <Text style={ dashboardStyles.addNoteButtonText }>+</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
    );
}

const dashboardStyles = StyleSheet.create({
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

    allNotesContainer: {
      textAlign: 'left'
    },
  
    notesContainer: {      
      width: '100%',
      height: '80%',
      alignItems: 'center'
    },

    searchNotes: {
      marginTop: '5%',
      backgroundColor: '#EFEFEF',
      color: 'black',
      width: '100%',
      borderRadius: 15,
      elevation: 5
    },

    allNotes: {
      width: '100%',
      height: '90%',
    },

    noteTitle: {
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 10
    },

    note_due: {
      fontSize: 13,
      marginBottom: 15
    },

    note: {
      marginTop: '2%',
      marginBottom: '2%',
      backgroundColor: '#EFEFEF',
      padding: '3%',
      height: '35%',
      width: '100%',
      borderRadius: 15,
      elevation: 5
    },

    inputField: {
      backgroundColor: '#F9F9F9',
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 10
    },

    addNoteButton: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: '-7%',
      backgroundColor: '#fdc500',
      height: 80,
      width: 80,
      borderRadius: 150,
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      zIndex: 3
    },

    addNoteButtonText: {
      fontWeight: 'bold',
      fontSize: 22,
    }
  });

  export default Dashboard;