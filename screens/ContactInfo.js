import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';
import Book from '../components/Book';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import InputBox from '../components/InputBox';

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
                <View style={styles.InputContainer}>
                    <Icon name="lock" size={20} color="#000" style={styles.icon} />
                    <TextInput style={styles.InputTextBox}
                        placeholder={"Full Name"}
                        value={name}
                        onChangeText={text => setName(text)} />
                </View>

                <View style={styles.InputContainer}>
                    <Icon name="lock" size={20} color="#000" style={styles.icon} />
                    <TextInput style={styles.InputTextBox}
                        placeholder={"Email"}
                        value={email}
                        onChangeText={text => setEmail(text)} />
                </View>
                {errorMessage !== '' && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}

                <View style={styles.buttonContainer}>
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
