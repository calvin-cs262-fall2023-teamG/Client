import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer





const ContactInfo = ({ navigation, book }) => {
    const [name, setName] = useState(''); // State to store the user's name
    const [email, setEmail] = useState(''); // State to store the user's email
    const [errorMessage, setErrorMessage] = useState('');



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
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#000"/>
                    <TextInput style={styles.InputTextBox}
                        placeholder={"Full Name"}
                        value={name}
                        onChangeText={text => setName(text)} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#000"/>
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
    inputs: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 250,
        paddingHorizontal: 15,
    },
    //The styling for Full name and Email text boxes, and icons
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#D9FFF6',
        marginBottom: 15,
        borderRadius: 15,
        justifyContent: "center" //center vertically
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center'
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
});

export default ContactInfo;
