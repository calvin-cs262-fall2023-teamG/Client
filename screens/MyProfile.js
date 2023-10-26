import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const MyProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmpassword, setconfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Retrieve user data from AsyncStorage
        const retrieveUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { email, username, password } = JSON.parse(userData);
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
        AsyncStorage.setItem('userData', JSON.stringify({ email: newEmail, username, password }));
        setEmail(newEmail);
        setEmailModalVisible(false);
        setNewEmail(''); // Clear the input field.
        setErrorMessage(''); // Clear the error message
    };

    const handleUpdateUsername = () => {
        AsyncStorage.setItem('userData', JSON.stringify({ email, username: newUsername, password }));
        setUsername(newUsername);
        setUsernameModalVisible(false);
        setNewUsername(''); // Clear the input field.
        setErrorMessage(''); // Clear the error message
    };

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

    const handleUpdatePassword = () => {
        if (newPassword !== confirmpassword) {
            setErrorMessage("Passwords do not match!");
        } else {
            try {
            AsyncStorage.setItem('userData', JSON.stringify({ email, username, password: newPassword }));
            setPassword(newPassword);
            setPasswordModalVisible(false);
            setNewPassword(''); // Clear the input field.
            setconfirmPassword(''); // Clear the input field.
            setErrorMessage(''); // Clear the error message
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
                <Text>Email: {email} </Text>
                {/* <Button style = "text" label="Change Email" onPress={() => setEmailModalVisible(true)}/> */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setEmailModalVisible(true)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Change Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InfoContainer}>
                <Text>UserName: {username} </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setUsernameModalVisible(true)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Change UserName</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InfoContainer}>
                <Text>Password: {'*'.repeat(password.length)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setPasswordModalVisible(true)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Email Update Modal */}
            <Modal isVisible={isEmailModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text paddingHorizontal={10}>Enter New Email:</Text>
                    <InputBox pHolder="New Email" icon="envelope" value={newEmail} set_text={text => setNewEmail(text)}  autofocus = {true} />

                    <Button style = "button" label="Update Email" onPress={handleUpdateEmail}/>
                    <Button style = "button" label="Cancel" onPress={clearEmailInput}/>

                </View>
            </Modal>

            {/* Username Update Modal */}
            <Modal isVisible={isUsernameModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text paddingHorizontal={10}>Enter New Username:</Text>
                    <InputBox pHolder="New Username" icon="user" value={newUsername} set_text={text => setNewUsername(text)}  autofocus = {true} />
                    
                    <Button style = "button" label="Update Username" onPress={handleUpdateUsername}/>
                    <Button style = "button" label="Cancel" onPress={clearUsernameInput}/>

                </View>
            </Modal>

            {/* Password Update Modal */}
            <Modal isVisible={isPasswordModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text paddingHorizontal={10}>Enter New Password:</Text>
                    <InputBox pHolder="New Password" icon="lock" value={newPassword}
                        set_text={text => setNewPassword(text)} secureTextEntry={!showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        showPassword={showPassword}
                        autofocus = {true} />
                    <InputBox pHolder="Confirm Password" icon="lock" value={confirmpassword}
                        set_text={text => setconfirmPassword(text)} secureTextEntry={!showConfirmPassword}
                        togglePasswordVisibility={toggleConfirmPasswordVisibility}
                        showPassword={showConfirmPassword}
                        autofocus = {false} />

                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <Button style = "button" label="Update Password" onPress={handleUpdatePassword}/>
                    <Button style = "button" label="Cancel" onPress={clearPasswordInput}/>

                </View>
            </Modal>
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
    },
    errorText:{
        textAlign: 'center',
        fontSize:15,
        color: '#ff0000',
    },
});


export default MyProfile;
