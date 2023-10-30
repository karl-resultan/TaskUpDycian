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


function Tasks({navigation}: {navigation: any}): JSX.Element {
  return (
    <View style={tasksStyles.mainContainer}>

    </View>
  );
}

const tasksStyles = StyleSheet.create({
    mainContainer: {
        
    }
});

export default Tasks;