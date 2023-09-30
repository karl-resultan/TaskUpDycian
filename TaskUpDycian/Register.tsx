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

function Register({navigation}: {navigation:any}): JSX.Element {
    return (
      <ScrollView style={registerStyles.mainContainer}>
        <View style={registerStyles.pageTitle}>
          <Text style={registerStyles.title}>Create Account</Text>
        </View>
  
        <View style={{ alignItems: 'center'}}>
          
          <View style={{ width: '80%'}}>
          <Text>Full Name</Text>
            <TextInput style={registerStyles.inputField} placeholder='Enter your Full Name'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text>Student Number</Text>
            <TextInput style={registerStyles.inputField} placeholder='Enter your Student Number'></TextInput>
          </View>
          
          
          <View style={{ width: '80%'}}>
            <Text>Status</Text>
            <TextInput style={registerStyles.inputField} placeholder='Enter your Status'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text>Department</Text>
            <TextInput style={registerStyles.inputField} placeholder='Enter your Department'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text>Course</Text>
            <TextInput style={registerStyles.inputField} placeholder='Enter your Course'></TextInput>
          </View>
  
          <Pressable style={{ width: '80%'}}>
            <View style={registerStyles.loginButton}>
              <Text style={registerStyles.loginButtonText}>Sign Up</Text>
            </View>
          </Pressable>
          
          <Pressable onPress={() => {navigation.navigate('Login')}}>
            <Text style={{ marginTop: '5%', marginBottom: '15%'}}>Already a User? Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

const registerStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#02DDEB',
        height: '100%',
        width: '100%',
    },

    pageTitle: {
        width: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: '20%',
    },

    inputField: {
        width: '100%',
        backgroundColor: '#FFF',
        color: '#000000',
        marginTop: '5%',
        marginBottom: '5%'
    },

    loginButton: {
        height: 35,
        width: '100%',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#0D6EFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButtonText: {
    fontWeight: 'bold',
    color: '#FFFFFF'
    },
});

  export default Register;