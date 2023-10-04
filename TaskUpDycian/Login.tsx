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

function Login({navigation}: {navigation: any}): JSX.Element {
  const [studentID, setStudentID] = React.useState('');
  const [password, setPassword] = React.useState('');

  function userLogin(){
      if (studentID != '' && password != ''){
        navigation.navigate('Dashboard');
        setStudentID('');
        setPassword('');
      }
  }

  return (
  <LinearGradient colors={['#02F5A5', '#01DBF1']} style={loginStyles.linearGradient}>
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
          <Text>Forgot Password?</Text>
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
    },
  
    inputFieldHeaders: {
      fontWeight: 'bold'
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
      backgroundColor: '#0D6EFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    loginButtonText: {
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    
    accountCreationCTA: {
      marginTop: '4%',
      textAlign: 'right'
    },
  
    additionalLinks: {
      marginTop: '20%',
      flexDirection: 'row'
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