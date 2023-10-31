import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from '../components/Book';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

// get height dimensions of the screen 
const { height: screenHeight } = Dimensions.get('window');

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
         <View style={styles.container}>
                 <View style={styles.shapesContainer}>
                     <View style={styles.shape1} />
                     <View style={styles.shape2} />
                     <View style={styles.shape3} />
                     <View style={styles.shape4} />
                     <View style={styles.shape5} />
                 </View>
        <ScrollView style={{paddingHorizontal: 20,}} showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>

            <Text style={styles.PageTitle}> Contact Information</Text>
            <Text style={styles.Info}>The information below will be provided to the buyer</Text>

            <View style={styles.inputs}>
                <InputBox pHolder="Full Name" icon="user" value={name} set_text={text => setName(text)} />
                <InputBox pHolder="Email" icon="envelope" value={email} set_text={text => setEmail(text)} />
                {errorMessage !== '' && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                <Button style = "button" label="Add Book" onPress={handleAddBook}/>
            </View>
        </ScrollView>
        </View>
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
    shape1: {
        position: "absolute",
        top: -90,
        left: -80,
        width: 190,
        height: 190,
        borderRadius: 90,
        backgroundColor: "#8CFFD6",
        opacity: 0.5,
      },
      shape2: {
        position: 'absolute',
        width: 200,
        height: 200,
        left: 40,
        borderRadius: 100,
        backgroundColor: '#A1FFB6',
        transform: [{ translateY: screenHeight - 110}],
      },
      shape3: {
        position: 'absolute',
        width: 200,
        height: 200,
        left: -90,
        borderRadius: 100,
        backgroundColor: '#8CFFD6',
        transform: [{ translateY: screenHeight - 200}],
      },
      shape4: {
        position: "absolute",
        width: 260,
        height: 120,
        left: 210,
        borderRadius: 70,
        backgroundColor: "#8CFFD6",
        transform: [{ rotate: "50deg" }],
      },
      shape5: {
        position: "absolute",
        width: 280,
        height: 140,
        left: 280,
        borderRadius: 40,
        backgroundColor: "#B4F7C3",
        transform: [{ rotate: "70deg" }],
      },

    //Text = 'Contact Information'
    PageTitle: {
        marginTop: 180,
        marginBottom: 12,
        fontSize: 37,
        fontWeight: "400",
    },
    Info: {
        marginBottom: 15,
        fontSize: 14,
        color: "#888181",
        paddingLeft: 10,
        marginLeft: 5,
    },
    inputs: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,

    },
    //Error Message
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ff0000',
        marginTop: 10,
    },
});

export default ContactInfo;
