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
import { useRoute } from '@react-navigation/native';

function NoteDetails({navigation}: {navigation: any}): JSX.Element {
    const route = useRoute();
    //@ts-ignore
    const noteId = route.params?.noteId || null;

    //@ts-ignore
    const noteTitle = route.params?.noteTitle || null;

    //@ts-ignore
    const noteDescription = route.params?.noteDescription || null;

    const [sharedState, setSharedState] = useState(false);
    const [currentNoteTitle, setCurrentNoteTitle] = useState(noteTitle);
    const [currentNoteDescription, setCurrentNoteDescription] = useState(noteDescription);
    const [attachment, setAttachment] = useState('No Attachment');
    const { userId, setUser } = useUser();

    async function deleteNote(){
      const note = {
        'id': noteId
      }
  
      try {
        // const response = await fetch('http://192.168.100.99:8000/delete_note', {
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
            navigation.navigate('Dashboard');
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    async function updateNote(){
      try {
        const response = await fetch(`https://task-up-dycian.onrender.com/update_note?note_id=${noteId}&note_title=${currentNoteTitle}&note_description=${currentNoteDescription}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'note updated.'){
            navigation.navigate('Dashboard');
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    async function retrieveAttachments(){
      try {
        // const response = await fetch(`http://192.168.100.99:8000/get_notes?id=${userId}`, {
        const response = await fetch(`https://task-up-dycian.onrender.com/get_note_attachments?note_id=${noteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.response);
  
          if (responseData.response == 'retrieval complete.'){
            console.log('All attachments');
            console.log(responseData.attachments);

            if (responseData.attachments.length > 0){
              setAttachment(responseData.attachments[0].content_type.replace('/opt/render/project/src/uploads/', ''));
            }
          }
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    }

    useEffect(() => {
      retrieveAttachments();
    }, []);

    return (
    <LinearGradient colors={['#00296b', '#00509d']} style={noteDetailStyles.linearGradient}>
      <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
      <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={noteDetailStyles.mainContainer}>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={noteDetailStyles.mainTitle}>Note Details</Text>

            <Pressable style={{ justifyContent: 'center' }} onPress={() => deleteNote()}>
                {/* <Image style={noteDetailStyles.deleteIcon} source={require('./assets/more.png')} /> */}
                <Text style={noteDetailStyles.sectionTitle}>Delete</Text>
            </Pressable>
        </View>

        <Text style={noteDetailStyles.sectionTitle}>Note Title</Text>
        <TextInput defaultValue={noteTitle} onChangeText={title => setCurrentNoteTitle(title)} value={currentNoteTitle} style={noteDetailStyles.inputField} placeholder='Enter note title...'/>

        <Text style={noteDetailStyles.sectionTitle}>Note Description</Text>
        <TextInput defaultValue={noteTitle} onChangeText={desc => setCurrentNoteDescription(desc)} value={currentNoteDescription} style={noteDetailStyles.inputField} placeholder='Enter note description...'/>

        <Text style={noteDetailStyles.sectionTitle}>Attachment(s)</Text>
        <Text style={noteDetailStyles.attachmentLink}>{attachment}</Text>

        <Pressable style={noteDetailStyles.saveButton} onPress={() => updateNote()}>
            <Text>Save Changes</Text>
        </Pressable>
      </View>
    </LinearGradient>
    );
}

const noteDetailStyles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
      },

    mainContainer: {
        height: '100%',
        width: '100%'
    },

    mainTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
        marginRight: '60%'
    },

    deleteIcon: {
        height: 20,
        width: 20,

    },

    sectionTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },

    attachmentLink: {
      marginTop: 30,
      color: 'white'
    },

    inputField: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        color: 'black',
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },

    saveButton: {
        marginTop: '10%',
        height: 40,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fdc500',
        alignSelf: 'center',
        borderRadius: 10,
    }
});

export default NoteDetails;