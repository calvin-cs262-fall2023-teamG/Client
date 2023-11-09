import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Background from '../components/Background';
import bcrypt from 'react-native-bcrypt';
import Animated, { SlideInDown, SlideInUp, SlideInLeft, FadeInLeft, FadeInRight, SlideInRight, BounceInRight, BounceInLeft, FadeInDown, BounceInDown, StretchInX, StretchInY, FadeIn, BounceInUp, ZoomIn, FadeInUp, ZoomOut } from 'react-native-reanimated';
import MyListings from './MyListings';
import { useNavigation } from '@react-navigation/native';

const saltRounds = 5; // Number of salt rounds, higher is more secure but slower

const MyProfile = () => {
    const [fullname, setFullname] = useState(''); //strings
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailModalVisible, setEmailModalVisible] = useState(false); //booleans
    const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmpassword, setconfirmPassword] = useState(''); //helpers and corroborators
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        // Retrieve user data from AsyncStorage
        const retrieveUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { ID, fullname, email, username, password } = JSON.parse(userData);
                    setUserID(ID)
                    setFullname(fullname);
                    setEmail(email);
                    setUsername(username);
                    setPassword(password);
                }
            } catch (error) {
                console.error(error);
            }
        };

        retrieveUserData();
    }, []);

    const handleUpdateEmail = () => {
        const domainToCheck = 'calvin.edu';
        const emailParts = newEmail.split('@');

        if (!(emailParts.length === 2 && emailParts[1] === domainToCheck)) {
            setErrorMessage("Please enter your Calvin email")
        } else {
            AsyncStorage.setItem('userData', JSON.stringify({ email: newEmail, username, password }));
            setEmail(newEmail);
            setEmailModalVisible(false);
            setNewEmail(''); // Clear the input field.
            setErrorMessage(''); // Clear the error message
        }
    };

    const handleUpdateUsername = () => {
        if (newUsername.length <= 3) {
            setErrorMessage("Your username must be at least 4 characters")
        } else {
            AsyncStorage.setItem('userData', JSON.stringify({ email, username: newUsername, password }));
            setUsername(newUsername);
            setUsernameModalVisible(false);
            setNewUsername(''); // Clear the input field.
            setErrorMessage(''); // Clear the error message
        }
    };

    //These functions are for resetting the holder strings
    const clearEmailInput = () => {
        setNewEmail('');
        setEmailModalVisible(false);
        setErrorMessage('');
    };

    const clearUsernameInput = () => {
        setNewUsername('');
        setUsernameModalVisible(false);
        setErrorMessage('');
    };

    const clearPasswordInput = () => {
        setNewPassword('');
        setconfirmPassword('');
        setPasswordModalVisible(false);
        setErrorMessage('');
    };

    const handleUpdatePassword = async () => {
        if (newPassword.length <= 7) {
            setErrorMessage("Your password must be at least 8 characters")
        } else if (newPassword !== confirmpassword) {
            setErrorMessage("Passwords do not match!");
        } else {
            try {
                bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
                    if (err) {
                        console.error('Error hashing password:', err);
                        return;
                    }
                    const data = { "ID": userID, "emailAddress" : email, "name": fullname, "username": username, "passwordHash": hash }
                    const response = await fetch(`https://chaptercachecalvincs262.azurewebsites.net/users/${userID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    if (!response.ok) {
                        const text = await response.text();
                        throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
                    }
                    setPassword(newPassword);
                    setPasswordModalVisible(false);
                    setNewPassword(''); // Clear the input field.
                    setconfirmPassword(''); // Clear the input field.
                    setErrorMessage(''); // Clear the error message
                });
            } catch (error) {
                console.error(error);
                setErrorMessage("Error creating account. Please try again.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.InfoContainer}>
                <Text>Full Name: {fullname} </Text>
            </View>

            <View style={styles.InfoContainer}>
                <Text>Email: {email} </Text>
                {/* <Button style = "text" label="Change Email" onPress={() => setEmailModalVisible(true)}/> */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setEmailModalVisible(true)}>
                        <Text style={styles.buttonText}>Change Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InfoContainer}>
                <Text>UserName: {username} </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setUsernameModalVisible(true)}>
                        <Text style={styles.buttonText}>Change UserName</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InfoContainer}>
                <Text>Password: {'*'.repeat(password.length)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setPasswordModalVisible(true)}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Email Update Modal */}
            <Modal isVisible={isEmailModalVisible}>
                <Animated.View style={styles.modalContainer} entering={ZoomIn.duration(500)}>
                    <Text paddingHorizontal={10}>Enter New Email:</Text>
                    <InputBox pHolder="New Email" icon="envelope" value={newEmail} set_text={text => setNewEmail(text)} autofocus={true} />
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <Button style="button" label="Update Email" onPress={handleUpdateEmail} />
                    <Button style="button" label="Cancel" onPress={clearEmailInput} />
                </Animated.View>
            </Modal>

            {/* Username Update Modal */}
            <Modal isVisible={isUsernameModalVisible} style={styles.modal}>
                <Animated.View style={styles.modalContainer} entering={ZoomIn.duration(500)}>
                    <Text paddingHorizontal={10}>Enter New Username:</Text>
                    <InputBox pHolder="New Username" icon="user" value={newUsername} set_text={text => setNewUsername(text)} autofocus={true} />
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <Button style="button" label="Update Username" onPress={handleUpdateUsername} />
                    <Button style="button" label="Cancel" onPress={clearUsernameInput} />

                </Animated.View>
            </Modal>

            {/* Password Update Modal */}
            <Modal isVisible={isPasswordModalVisible} style={styles.modal}>
                <Animated.View style={styles.modalContainer} entering={ZoomIn.duration(500)}>
                    <Text paddingHorizontal={10}>Enter New Password:</Text>
                    <InputBox pHolder="New Password" icon="lock" value={newPassword}
                        set_text={text => setNewPassword(text)} secureTextEntry={!showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        showPassword={showPassword}
                        autofocus={true} />
                    <InputBox pHolder="Confirm Password" icon="lock" value={confirmpassword}
                        set_text={text => setconfirmPassword(text)} secureTextEntry={!showConfirmPassword}
                        togglePasswordVisibility={toggleConfirmPasswordVisibility}
                        showPassword={showConfirmPassword}
                        autofocus={false} />

                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <Button style="button" label="Update Password" onPress={handleUpdatePassword} />
                    <Button style="button" label="Cancel" onPress={clearPasswordInput} />

                </Animated.View>
            </Modal>
            <TouchableOpacity 
                        onPress={() => navigation.navigate("My Listings")}
                        style={styles.roundButton}>
                        <Text>My Listings</Text>
                    </TouchableOpacity>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'top',
    },
    InfoContainer: {
        flexDirection: 'row',
        height: 50,
        width: 400,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#D9FFF6',
        borderRadius: 15,
        justifyContent: 'left',
        paddingHorizontal: 15
    },
    buttonContainer: {
        flex: 1, // Takes up the remaining space to push the button to the right
        alignItems: 'flex-end', // Align the button to the right
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 250
    },
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ff0000',
        marginTop: 10,
    },
    roundButton: {
        width: 182,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#81F4D8',
        marginTop: 334
    },

});


export default MyProfile;
