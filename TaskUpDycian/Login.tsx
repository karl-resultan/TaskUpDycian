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
import { useUser } from './UserContext';

function Login({navigation}: {navigation: any}): JSX.Element {
  const [studentID, setStudentID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { userId, setUser } = useUser();

  async function userLogin(){
    const user = {
      'student_id': studentID,
      'password': password
    }

    try {
      console.log(user.student_id);
      console.log(user.password);
      // console.log('Sending request to https://task-up-dycian.onrender.com/login');

      const response = await fetch('http://192.168.100.99:8000/login', {
      // const response = await fetch('https://task-up-dycian.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.response);

        if (responseData.response == 'login success'){
          setStudentID('');
          setPassword('');
          setUser(responseData.user_id);
          navigation.navigate('Dashboard');
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  return (
  <LinearGradient colors={['#00296b', '#00509d']} style={loginStyles.linearGradient}>
    <View style={loginStyles.mainContainer}>
      <View style={loginStyles.content}>
      <Text style={loginStyles.pageTitle}>Task-UP Dycian</Text>

      <View style={{width: '80%'}}>
          <Text style={loginStyles.inputFieldHeaders}>Student ID</Text>
          <TextInput defaultValue={studentID} onChangeText={studentID => setStudentID(studentID)} style={loginStyles.inputField} placeholder='Enter your Student ID...'/>
      </View>

      <View style={{width: '80%'}}>
          <Text style={loginStyles.inputFieldHeaders}>Password</Text>
          <TextInput defaultValue={password} onChangeText={password => setPassword(password)} style={loginStyles.inputField} secureTextEntry={true} placeholder='Enter your password...'/>
          <Text style={{ color: 'white' }}>Forgot Password?</Text>
      </View>

        <View style={{width: '80%'}}>
            <Pressable style={loginStyles.loginButton}>
            <Text style={loginStyles.loginButtonText} onPress={() => userLogin()}>LOGIN</Text>
            </Pressable>
            <View>
            <Text style={loginStyles.accountCreationCTA} onPress={() => navigation.navigate('Register')}>No account? Click here</Text>
            </View>
        </View>

        <PageBottom></PageBottom>
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
  
    content: {
      width: '100%',
      height: '100%',
      alignItems: 'center'
    },
  
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: '15%',
      marginTop: '20%',
      color: 'white'
    },
  
    inputFieldHeaders: {
      fontWeight: 'bold',
      color: 'white'
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
      marginTop: '3%',
      borderRadius: 15,
      backgroundColor: '#fdc500',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    loginButtonText: {
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    
    accountCreationCTA: {
      marginTop: '4%',
      textAlign: 'right',
      color: 'white'
    },
  
    additionalLinks: {
      marginTop: '20%',
      flexDirection: 'row',
    },
  
    additionalLink: {
      margin: '2%'
    },
  
    schoolLogo: {
      height: '20%',
      width: '20%',
      borderRadius: 150,
      backgroundColor: '#FFFFFF'
    }
  });

  export default Login;