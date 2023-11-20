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
  Pressable
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';
import { useUser } from './UserContext';

function Dashboard({navigation}: {navigation: any}): JSX.Element {
    const [sharedState, setSharedState] = useState(false);
    const [noteDetails, setNoteDetails] = useState('');
    const [notes, setNotes] = useState([]);
    const { userId, setUser } = useUser();

    const [isNotesViewable, setIsNotesViewable] = useState(sharedState);
    const notesDisplay = isNotesViewable ? {'display': 'block'} : {'display': 'none'};

    async function retrieveNotes(){
      try {
        const response = await fetch(`http://192.168.100.99:8000/get_notes?id=${userId}`, {
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

    function openNoteCreation(){
      setIsNotesViewable(true);
    }

    function closeNoteCreation(){
      setIsNotesViewable(false);
      setNoteDetails('');
    }

    async function sendNoteData(){
      const note = {
        'note_description': noteDetails,
        'note_owner': userId
      }
  
      try {
        console.log(note.note_description);
        console.log(note.note_owner);
  
        const response = await fetch('http://192.168.100.99:8000/create_note', {
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
            setIsNotesViewable(false);
            retrieveNotes();
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
        const response = await fetch('http://192.168.100.99:8000/delete_note', {
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
            setNoteDetails('');
            setIsNotesViewable(false);
            retrieveNotes();
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    useEffect(() => {
      retrieveNotes();
    }, [])

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

          <ScrollView contentContainerStyle={{ marginTop: 20, height: 275, width: 300, alignItems: 'center' }}>
            {notes.map((item) => (
              <View key={item.id} style={dashboardStyles.note}>
                <Text>{item.note_description}</Text>
                
                <Pressable>
                  <Text>Edit</Text>
                </Pressable>

                <Pressable onPress={() => deleteNote(item.id)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Pressable style={ dashboardStyles.addNoteButton } onPress={() => openNoteCreation()}>
            <Text style={ dashboardStyles.addNoteButtonText }>+</Text>
          </Pressable>
        </View>

        <View style={[dashboardStyles.noteCreationContainer, notesDisplay]}>
          <Text style={dashboardStyles.noteCreationHeader}>CREATE NOTE</Text>

          <Text>Description</Text>
          <TextInput 
            defaultValue={noteDetails} 
            onChangeText={details => setNoteDetails(details)} 
            style={dashboardStyles.inputField} 
            placeholder='Enter note details...'
          />

          <View style={dashboardStyles.noteCreationContainerButtons}>
            <Pressable style={dashboardStyles.noteCreationContainerButton} onPress={() => sendNoteData()}>
              <Text>Create</Text>
            </Pressable>

            <Pressable style={dashboardStyles.noteCreationContainerButton} onPress={() => closeNoteCreation()}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
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
      alignItems: 'center'
    },
  
    gradient: {
      width: '100%',
      height: '100%'
    },

    allNotesContainer: {
      textAlign: 'left'
    },
  
    notesContainer: {
      padding: 3,
      width: '90%',
      height: '65%',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 20
    },

    searchNotes: {
      marginTop: '5%',
      backgroundColor: '#EFEFEF',
      width: '80%',
      borderRadius: 15
    },

    allNotes: {
      width: '100%',
      height: '80%',
    },

    note: {
      marginTop: '5%',
      marginBottom: '5%',
      backgroundColor: '#EFEFEF',
      padding: '3%',
      height: '30%',
      width: '80%',
      borderRadius: 15
    },

    noteCreationContainer: {
      position: 'absolute',
      marginTop: 75,
      width: '90%',
      height: '45%',
      minHeight: '45%',
      padding: 15,
      backgroundColor: '#F4F5DB',
      borderRadius: 15,
      shadowRadius: 5,
      zIndex: 12,
      elevation: 5,
    },

    noteCreationHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20
    },

    noteCreationContainerButtons: {
      flexDirection: 'row'
    },

    noteCreationContainerButton: {
      marginRight: 15
    },

    inputField: {
      backgroundColor: '#F9F9F9',
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 10
    },

    addNoteButton: {
      alignSelf: 'flex-end',
      marginTop: '3%',
      backgroundColor: '#ADD6F5',
      height: 70,
      width: 70,
      borderRadius: 150,
      alignItems: 'center',
      justifyContent: 'center'
    },

    addNoteButtonText: {
      fontWeight: 'bold',
      fontSize: 22,
    }
  });

  export default Dashboard;