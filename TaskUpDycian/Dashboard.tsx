import React from 'react';
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
import PageBottom from './PageBottom';
import Welcome from './Welcome';

function Dashboard({navigation}: {navigation: any}): JSX.Element {
    return (
    <LinearGradient colors={['#02F5A5', '#01DBF1']} style={loginStyles.linearGradient}>
      <View style={loginStyles.mainContainer}>
        <View>
        </View>

        <View style={{ marginBottom: '10%', marginTop: '10%' }}>
          <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>ALL NOTES</Text>
        </View>

        <View style={loginStyles.notesContainer}>
          <TextInput style={loginStyles.searchNotes } placeholder='Search notes...'></TextInput>
          <View style={loginStyles.note }>
            <Text>Sample Note</Text>
          </View>
          <View style={loginStyles.note }>
            <Text>Sample Note</Text>
          </View>
        </View>

        <View>
          <Pressable style={ loginStyles.addNoteButton }>
            <Text style={ loginStyles.addNoteButtonText }>+</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
    );
}

const loginStyles = StyleSheet.create({
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
      height: '70%',
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

    note: {
      marginTop: '5%',
      marginBottom: '5%',
      backgroundColor: '#EFEFEF',
      padding: '3%',
      height: '30%',
      width: '80%',
      borderRadius: 15
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