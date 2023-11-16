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
                <View style={pageBottomStyles.collegeLogo}></View>
                <Text style={{ marginTop: '2%', color: 'white' }}>Dr. Yanga's Colleges INC.</Text>
            </View>

            <View style={pageBottomStyles.bottomContent}>
                {/* insert image here */}
                {/* insert image here */}
                {/* insert image here */}
            </View>
        </View>
    );
}

const pageBottomStyles = StyleSheet.create({
    mainContainer: {
      marginTop: '10%',
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
        flex: 1,
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