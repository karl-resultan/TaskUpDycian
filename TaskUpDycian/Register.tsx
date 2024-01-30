import React, { useState } from 'react';
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

import DropDownPicker from 'react-native-dropdown-picker';

import LinearGradient from 'react-native-linear-gradient';
import PageBottom from './PageBottom';

function Register({navigation}: {navigation:any}): JSX.Element {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [studentNumber, setStudentNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [courseChoices, setCourseChoices] = useState([] as { label: string, value: string}[]);

  const [statusOpen, setStatusOpen] = React.useState(false);
  const [depOpen, setDepOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);

  // DROPDOWN SELECTIONS
  const stat_ph = {
    label: 'Select an option...',
    value: null,
  };

  const dep_ph = {
    label: 'Select an option...',
    value: null,
  };

  const course_ph = {
    label: 'Select an option...',
    value: null,
  };

  const status_choices = [
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Transferee', value: 'Transferee' },
    { label: 'Graduate', value: 'Graduate' },
  ];

  const dep_choices = [
    { label: 'CCS', value: 'CCS' },
    { label: 'COED', value: 'COED' },
    { label: 'CBA', value: 'CBA' },
    { label: 'CHS', value: 'CHS' },
  ];


  function modifyCourseChoices(){
    let course_choices = [];
    
    switch(department){
      case 'CCS':
        course_choices = [
          { label: 'BSCS', value: 'BSCS' },
          { label: 'BSIT', value: 'BSIT' },
          { label: 'BSCE', value: 'BSCE' },
        ] as { label: string, value: string}[];

        setCourseChoices(course_choices);
        break;

      case 'COED':
        course_choices = [
          { label: 'BEE', value: 'BEE' },
          { label: 'BSE', value: 'BSE' }
        ] as { label: string, value: string}[];

        setCourseChoices(course_choices);
        break;

      case 'CBA':
        course_choices = [
          { label: 'BSBA', value: 'BSBA' }
        ] as { label: string, value: string}[];

        setCourseChoices(course_choices);
        break;

      case 'CHS':
        course_choices = [
          { label: 'BSN', value: 'BSN' },
          { label: 'BSM', value: 'BSM' }
        ] as { label: string, value: string}[];

        setCourseChoices(course_choices);
        break;
    }
  }

  async function register(){
    const register_data = {
      'student_id': studentNumber,
      'password': password,
      'first_name': firstName,
      'last_name': lastName,
      'middle_initial': middleName,
      'status': status,
      'department': department,
      'course': course
    }

    try {
      // const response = await fetch('http://192.168.100.99:8000/register', {
      const response = await fetch('https://task-up-dycian.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(register_data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        navigation.navigate('Login');
        setFirstName('');
        setLastName('');
        setMiddleName('');
        setStudentNumber('');
        setStatus('');
        setDepartment('');
        setCourse('');
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  return (
    <LinearGradient colors={['#00296b', '#00509d']} style={registerStyles.linearGradient}>
      <ScrollView style={registerStyles.mainContainer}>
        <View style={registerStyles.pageTitle}>
          <Text style={registerStyles.title}>Create Account</Text>
        </View>
  
        <View style={{ alignItems: 'center'}}>
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>First Name</Text>
            <TextInput defaultValue={firstName} onChangeText={name => setFirstName(name)} style={registerStyles.inputField} placeholder='Enter your First Name'></TextInput>
          </View>

          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Last Name</Text>
            <TextInput defaultValue={lastName} onChangeText={name => setLastName(name)} style={registerStyles.inputField} placeholder='Enter your Last Name'></TextInput>
          </View>

          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Middle Name</Text>
            <TextInput defaultValue={middleName} onChangeText={name => setMiddleName(name)} style={registerStyles.inputField} placeholder='Enter your Middle Name'></TextInput>
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Student Number</Text>
            <TextInput defaultValue={studentNumber} onChangeText={stud_number => setStudentNumber(stud_number)} style={registerStyles.inputField} placeholder='Enter your Student Number'></TextInput>
          </View>

          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Password</Text>
            <TextInput defaultValue={password} onChangeText={password => setPassword(password)} style={registerStyles.inputField} placeholder='Enter your Password'></TextInput>
          </View>
          
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Status</Text>
            <DropDownPicker
              open={statusOpen}
              value={status}
              items={status_choices}
              setOpen={setStatusOpen}
              setValue={setStatus}
              zIndex={102}
            />
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Department</Text>
            <DropDownPicker
              open={depOpen}
              value={department}
              items={dep_choices}
              setOpen={setDepOpen}
              setValue={setDepartment}
              onSelectItem={() => modifyCourseChoices()}
              zIndex={101}
            />
          </View>
  
          
          <View style={{ width: '80%'}}>
            <Text style={registerStyles.inputFieldText}>Program</Text>
            <DropDownPicker
              open={courseOpen}
              value={course}
              items={courseChoices}
              setOpen={setCourseOpen}
              setValue={setCourse}
              zIndex={100}
            />
          </View>
  
          <Pressable style={{ width: '80%'}} onPress={() => register()}>
            <View style={registerStyles.loginButton}>
              <Text style={registerStyles.loginButtonText}>Submit</Text>
            </View>
          </Pressable>
          
          <Pressable onPress={() => {navigation.navigate('Login')}}>
            <Text style={{ marginTop: '5%', marginBottom: '15%', color: 'white' }}>Already a User? Login</Text>
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
        alignItems: 'center',
        color: 'white'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: '20%',
        color: 'white'
    },

    inputField: {
        height: 40,
        width: '100%',
        backgroundColor: '#FFF',
        color: 'black',
        marginTop: '5%',
        marginBottom: '5%',
        fontSize: 13
    },

    inputFieldText: {
      fontWeight: 'bold',
      color: 'white'
    },

    loginButton: {
        height: 35,
        width: '100%',
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#fdc500',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButtonText: {
      fontWeight: 'bold',
      color: 'white'
    },
});

  export default Register;