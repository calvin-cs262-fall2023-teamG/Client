import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <View style={styles.InputContainer}>
                        <Icon name="envelope" size={18} color="#888181" style={styles.icon} />
                        <TextInput
                            style={styles.InputTextBox}
                            value={newEmail}
                            onChangeText={(text) => setNewEmail(text)}
                            placeholder="New Email"
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleUpdateEmail}
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Update Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={clearEmailInput} // Clear input and hide modal
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Username Update Modal */}
            <Modal isVisible={isUsernameModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text paddingHorizontal={10}>Enter New Username:</Text>
                    <View style={styles.InputContainer}>
                        <Icon name="user" size={20} color="#888181" style={styles.icon} />
                        <TextInput
                            value={newUsername}
                            onChangeText={(text) => setNewUsername(text)}
                            placeholder="New Username"
                            style={styles.InputTextBox}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleUpdateUsername}
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Update Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={clearUsernameInput}
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Password Update Modal */}
            <Modal isVisible={isPasswordModalVisible} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text paddingHorizontal={10}>Enter New Password:</Text>
                    <View style={styles.InputContainer}>
                        <Icon name="lock" size={20} color="#888181" style={styles.icon} />
                        <TextInput
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            placeholder="New Password"
                            secureTextEntry={!showPassword}
                            style={styles.InputTextBox}
                            autoFocus={true}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.InputContainer}>
                        <Icon name="lock" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={styles.InputTextBox}
                            placeholder={"Confirm Password"}
                            secureTextEntry={!showConfirmPassword}
                            value={confirmpassword}
                            onChangeText={text => setconfirmPassword(text)} />
                        {/*Shows or hides the password based on what the user chooses*/}
                        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                            <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <TouchableOpacity
                        onPress={handleUpdatePassword}
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Update Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={clearPasswordInput}
                        style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
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
    InputTextBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,

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
    modalButton: {
        backgroundColor: '#81F4D8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 3,
    },
    modalButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText:{
        textAlign: 'center',
        fontSize:15,
        color: '#ff0000',
    },
});


export default MyProfile;
