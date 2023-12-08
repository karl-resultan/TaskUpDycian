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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SideNavigation from './SideNavigation';
import DashboardHeader from './DashboardHeader';
import PageBottom from './PageBottom';
import { useUser } from './UserContext';


function Profile({navigation}: {navigation: any}): JSX.Element {
  const [sharedState, setSharedState] = useState(false);
  const [ name, setName ] = useState('');
  const [ school, setSchool ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ department, setDepartment ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ contact, setContact ] = useState('');
  const { userId, setUser } = useUser();


  async function retrieveUser(){
    const user = {
      'id': userId
    }
  
    try {
      const response = await fetch('http://192.168.100.99:8000/get_user_data', {
      // const response = await fetch('https://task-up-dycian.onrender.com/get_user_data', {
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
          setName(`${responseData.user_data.first_name} ${responseData.user_data.middle_initial} ${responseData.user_data.last_name}`);
          setSchool('DYCI');
          setBirthday(responseData.user_data.birthday);
          setDepartment(responseData.user_data.department);
          setEmail(responseData.user_data.email);
          setContact(responseData.user_data.contact);
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
  }, [])

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={profileStyles.linearGradient}>
        <DashboardHeader sharedState={sharedState} setSharedState={setSharedState}></DashboardHeader>
        <SideNavigation sharedState={sharedState} setSharedState={setSharedState} navigation={navigation}></SideNavigation>

      <View style={profileStyles.mainContainer}>
        <View style={profileStyles.mainViewContainer}>
          <View style={{ flexDirection: 'row', width: '100%', height: '80%' }}>
            <View style={profileStyles.leftSection}>
                <View></View>
                <Pressable style={profileStyles.profileButton}>
                    <Text>Info</Text>
                </Pressable>
                <Pressable style={profileStyles.profileButton}>
                    <Text>Edit</Text>
                </Pressable>
            </View>

            <View style={profileStyles.rightSection}>
                <Text style={profileStyles.sectionHeading}>About Me</Text>
                <Text style={profileStyles.profileText}>College Department: {department}</Text>
                <Text style={profileStyles.profileText}>School: {school}</Text>
                <Text style={profileStyles.profileText}>Name: {name}</Text>
                <Text style={profileStyles.profileText}>Birthday: {birthday}</Text>

                <Text style={profileStyles.sectionHeading}>Contact Information</Text>
                <Text style={profileStyles.profileText}>Email: {email}</Text>
                <Text style={profileStyles.profileText}>Phone: {contact}</Text>
            </View>
          </View>
        </View>
      </View>

      <PageBottom />
    </LinearGradient>
  );
}

const profileStyles = StyleSheet.create({
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
      height: '100%',
      width: '100%',
      alignItems: 'center',
      marginTop: '10%'
    },

    leftSection: {
        width: '30%',
        alignItems: 'center',
        marginRight: '5%'
    },

    profileButton: {
        width: '80%',
        backgroundColor: '#ADD6F5',
        marginTop: '3%',
        marginBottom: '3%',
        alignItems: 'center'
    },

    rightSection: {
        padding: '5%',
        width: '65%',
        backgroundColor: 'white'
    },

    sectionHeading: {
        marginTop: '5%',
        fontSize: 18,
        fontWeight: 'bold'
    },

    profileText: {
        marginTop: '3%',
        marginBottom: '3%',
    }
});

export default Profile;