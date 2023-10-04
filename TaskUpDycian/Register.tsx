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

function Register({navigation}: {navigation:any}): JSX.Element {
  const [fullName, setFullName] = React.useState('');
  const [studentNumber, setStudentNumber] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [course, setCourse] = React.useState('');

  function register(){
    if (fullName != '' && studentNumber != '' && status != '' && department != '' && course != ''){
      navigation.navigate('Login');
      setFullName('');
      setStudentNumber('');
      setStatus('');
      setDepartment('');
      setCourse('');
    }
  }

  return (
    <LinearGradient colors={['#02F5A5', '#01DBF1']} style={registerStyles.linearGradient}>
      <ScrollView style={registerStyles.mainContainer}>
        <View style={registerStyles.pageTitle}>
          <Text style={registerStyles.title}>Create Account</Text>
        </View>
  
        <View style={{ alignItems: 'center'}}>
          
          <View style={{ width: '80%'}}>
          <Text style={registerStyles.inputFieldText}>Full Name</Text>
            <TextInput defaultValue={fullName} onChangeText={name => setFullName(name)} style={registerStyles.inputField} placeholder='Enter your Full Name'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Student Number</Text>
            <TextInput defaultValue={studentNumber} onChangeText={stud_number => setStudentNumber(stud_number)} style={registerStyles.inputField} placeholder='Enter your Student Number'></TextInput>
          </View>
          
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Status</Text>
            <TextInput defaultValue={status} onChangeText={assigned_stat => setStatus(assigned_stat)} style={registerStyles.inputField} placeholder='Enter your Status'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Department</Text>
            <TextInput defaultValue={department} onChangeText={set_dep => setDepartment(set_dep)} style={registerStyles.inputField} placeholder='Enter your Department'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Course</Text>
            <TextInput defaultValue={course} onChangeText={set_course => setCourse(set_course)} style={registerStyles.inputField} placeholder='Enter your Course'></TextInput>
          </View>
  
          <Pressable style={{ width: '80%'}} onPress={() => register()}>
            <View style={registerStyles.loginButton}>
              <Text style={registerStyles.loginButtonText}>Sign Up</Text>
            </View>
          </Pressable>
          
          <Pressable onPress={() => {navigation.navigate('Login')}}>
            <Text style={{ marginTop: '5%', marginBottom: '15%'}}>Already a User? Login</Text>
          </Pressable>
        </View>

        <PageBottom></PageBottom>
      </ScrollView>
    </LinearGradient>
  );
}

const registerStyles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },

    mainContainer: {
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
        height: 40,
        width: '100%',
        backgroundColor: '#FFF',
        color: '#000000',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 13
    },

    inputFieldText: {
      fontWeight: 'bold'
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