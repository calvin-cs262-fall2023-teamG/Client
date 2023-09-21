import React from 'react';
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
        <Text style = {styles.loginheader}> ChapterCache</Text>

        <Text style = {styles.SignIn}> Sign in</Text>
        <Text style = {styles.SignIninfo}> Please fill these credentials</Text>

        <TextInput style = {styles.input} placeholder= {"UserName"}/>
        <TouchableOpacity>
            <Button title="Login" onPress={() => navigation.navigate('Main')} />
        </TouchableOpacity>
        <TextInput style = {styles.input} placeholder= {"Password"}/>

      
    </View>
  );
};

const styles = StyleSheet.create({
    loginheader:{
        paddingTop: 50,
        paddingHorizontal: 20,
        fontSize: 15,
        fontWeight: 'Bold',
    },
    SignIn:{
        paddingTop: 50,
        paddingHorizontal: 20,
        fontSize: 30,
        fontWeight: 'Bold',
    },
    SignIninfo:{
        paddingHorizontal: 20,
        fontSize:15,
        color:'#888181'
    },
    input:{

    }
})

export default LoginScreen;
