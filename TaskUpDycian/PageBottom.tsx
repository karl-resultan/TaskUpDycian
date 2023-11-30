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

function PageBottom(): JSX.Element {
    return (
        <View style={pageBottomStyles.mainContainer}>
            <View style={pageBottomStyles.topLinksContainer}>
                <Text style={{ alignSelf: 'flex-start', marginRight: '15%', color: 'white'}}>About Us</Text>
                <Text style={{ alignSelf: 'flex-end', color: 'white'}}>FAQs</Text>
            </View>

            <View style={pageBottomStyles.centerContent}>
                <Image style={{ height: 100, width: 100 }} source={require('./assets/school-logo.png')}/>
                <Text style={{ marginTop: '2%', color: 'white' }}>Dr. Yanga's Colleges INC.</Text>
            </View>

            <View style={pageBottomStyles.bottomContent}>
                {/* <Image style={{ height: 45, width: 45, marginLeft: 30, marginRight: 30 }} source={require('./assets/school-logo.png')}/>
                <Image style={{ height: 45, width: 45, marginLeft: 30, marginRight: 30 }} source={require('./assets/school-logo.png')}/>
                <Image style={{ height: 45, width: 45, marginLeft: 30, marginRight: 30 }} source={require('./assets/school-logo.png')}/> */}
            </View>
        </View>
    );
}

const pageBottomStyles = StyleSheet.create({
    mainContainer: {
      marginTop: '2%',
      height: '30%',
      width: '100%',
      alignItems: 'center'
    },
  
    topLinksContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '2%'
    },

    centerContent: {
        alignItems: 'center'
    },

    bottomContent: {
        flexDirection: 'row',
        marginBottom: '10%'
    },

    collegeLogo: {
        height: 80,
        width: 80,
        borderRadius: 150,
        backgroundColor: '#FFFFFF'
    }
  });

  export default PageBottom;