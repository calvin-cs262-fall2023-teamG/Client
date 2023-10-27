import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from '../components/Book';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const ContactInfo = ({ navigation, book }) => {
    const [name, setName] = useState(''); // State to store the user's name
    const [email, setEmail] = useState(''); // State to store the user's email
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Retrieve data from AsyncStorage
        try {
          const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
              const { email, username, password } = JSON.parse(userData);
              setEmail(email);
              setName(username);
              console.log("Autofilled fields with " + username + " & " + email);
            }
          };
          fetchUserData();
        } catch (error) {
          console.error(error);
        }
      }, []);

    const handleAddBook = () => {
        const domainToCheck = 'calvin.edu';
        const emailParts = email.split('@');
        if (!(emailParts.length === 2 && emailParts[1] === domainToCheck)) {
            setErrorMessage("Please enter your Calvin email")
        } else {
            navigation.navigate('Main', book)
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.shapesContainer}>
                <View style={styles.shape1} />
                <View style={styles.shape2} />
                <View style={styles.shape3} />
                <View style={styles.shape4} />
                <View style={styles.shape5} />
            </View>
            <View style={styles.inputs}>
                <InputBox pHolder="Full Name" icon="user" value={name} set_text={text => setName(text)} />
                <InputBox pHolder="Email" icon="envelope" value={email} set_text={text => setEmail(text)} />
                {errorMessage !== '' && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                <Button style = "button" label="Add Book" onPress={handleAddBook}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shapesContainer: {
        position: 'absolute',
        flexWrap: 'wrap',
    },
    inputs: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 200,
        paddingHorizontal: 50,
    },
    shape1: {
        position: 'absolute',
        top: -80,
        left: -80,
        width: 190,
        height: 190,
        borderRadius: 90,
        backgroundColor: '#8CFFD6',
        opacity: 0.5,
    },
    shape2: {
        position: 'absolute',
        width: 200,
        height: 200,
        top: 600,
        left: -29,
        borderRadius: 100,
        backgroundColor: '#A1FFB6',
    },
    shape3: {
        position: 'absolute',
        width: 200,
        height: 250,
        top: 550,
        left: -120,
        borderRadius: 100,
        backgroundColor: '#8CFFD6',
    },
    shape4: {
        position: 'absolute',
        width: 260,
        height: 150,
        left: 200,
        borderRadius: 70,
        backgroundColor: '#8CFFD6',
        transform: [{ rotate: '50deg' }],
    },
    shape5: {
        position: 'absolute',
        width: 280,
        height: 150,
        left: 280,
        borderRadius: 40,
        backgroundColor: '#B4F7C3',
        transform: [{ rotate: '70deg' }],
    },
    //Error Message
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ff0000',
    },
    inputs: {
        marginTop: 200,
    },
});

export default ContactInfo;
