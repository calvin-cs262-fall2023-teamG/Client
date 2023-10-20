import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';
import Book from '../components/Book';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

const PlaceholderImage_front = require('../assets/book_icon.png');
const PlaceholderImage_back = require('../assets/book_icon_back.png');



const ContactInfo = ({ navigation, book }) => {
    const [selectedImage_front, setSelectedImage_front] = useState(null);
    const [selectedImage_back, setSelectedImage_back] = useState(null);
    const [name, setName] = useState(''); // State to store the user's name
    const [email, setEmail] = useState(''); // State to store the user's email
    const [errorMessage, setErrorMessage] = useState('');

    const pickImageAsync_front = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
     });
     if (!result.canceled) {
        setSelectedImage_front(result.assets[0].uri);
      }
    }
    const pickImageAsync_back = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
     });
     if (!result.canceled) {
        setSelectedImage_back(result.assets[0].uri);
      }
    }

    const handleAddBook = ()=> {
        const domainToCheck = 'calvin.edu';
        const emailParts = email.split('@');
        if (!(emailParts.length === 2 && emailParts[1] === domainToCheck)) {
            setErrorMessage("Please enter your Calvin email")
        } else {
            navigation.navigate('Main, book')
        }
    };

    return (
      <ScrollView style={styles.container}>
        <View>
            <View style = {styles.inputs}>
            <View style={styles.InputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
                <TextInput style={styles.InputTextBox}
                            placeholder={"Full Name"}
                            value={name}
                            onChangeText={text => setName(text)}/>
            </View>

            <View style={styles.InputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
                <TextInput style={styles.InputTextBox}
                            placeholder={"Email"}
                            value={email}
                            onChangeText={text => setEmail(text)}/>
            </View>
            {errorMessage !== '' && (
                    <Text style = {styles.errorText}>{errorMessage}</Text>
                )}
            </View>        

            <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddBook}>
                    <View style={styles.okButton}>
                        <Text >Add Book</Text> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    //The styling for UserName and Password text boxes, and icons
    InputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: '#D9FFF6',
        marginBottom: 15,
        borderRadius: 15,
        justifyContent: "center" //center vertically
    },
    
    text: {
        fontSize: 20,
        marginBottom: 5,
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center'
    },
    contact: {
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    okButton: {
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        width: 182
    },
    InputTextBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,

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
