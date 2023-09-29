/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function LoginBottomContent(): JSX.Element {
  return (
    <View>
      {/* <Image source={require('')}/> */}
    </View>
  );
}

function App(): JSX.Element {
  return (
    <View style={loginStyles.mainContainer}>
      <View style={loginStyles.content}>
        <Text style={loginStyles.pageTitle}>Task-UP Dycian</Text>

        <View style={{width: '80%'}}>
          <Text style={loginStyles.inputFieldHeaders}>Student ID</Text>
          <TextInput style={loginStyles.inputField} placeholder='Enter your Student ID...'/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={loginStyles.inputFieldHeaders}>Password</Text>
          <TextInput style={loginStyles.inputField} secureTextEntry={true} placeholder='Enter your password...'/>
          <Text>Forgot Password?</Text>
        </View>

        <View style={{width: '80%'}}>
          <Pressable style={loginStyles.loginButton}>
            <Text style={loginStyles.loginButtonText}>LOGIN</Text>
          </Pressable>
          <View>
            <Text style={loginStyles.accountCreationCTA}>No account? Click here</Text>
          </View>
        </View>


        <View style={loginStyles.additionalLinks}>
          <View style={loginStyles.additionalLink}>
            <Text>About Us</Text>
          </View>

          <View style={loginStyles.additionalLink}>
            <View style={loginStyles.schoolLogo}></View>
          </View>

          <View style={loginStyles.additionalLink}>
            <Text>FAQs</Text>
          </View>
        </View>

        <View>

        </View>
      </View>
    </View>
  );
}


function Register(): JSX.Element {
  return (
    <View>
      <View>
        <Text>Create Account</Text>
      </View>

      <View>
        <Text>Full Name</Text>
        <View>
          <TextInput></TextInput>
          <TextInput></TextInput>
          <TextInput></TextInput>
        </View>

        <Text>Student Number</Text>
        <TextInput></TextInput>
        
        <Text>Status</Text>
        <TextInput></TextInput>

        <Text>Department</Text>
        <TextInput></TextInput>

        <Text>Course</Text>
        <TextInput></TextInput>

        <Pressable>
          <View>
            <Text>Sign Up</Text>
          </View>
        </Pressable>
        <Text>Already a User? Login</Text>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#02DDEB',
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



export default App;
