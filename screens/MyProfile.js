import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const MyProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

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
    };

    const handleUpdateUsername = () => {
        AsyncStorage.setItem('userData', JSON.stringify({ email, username: newUsername, password }));
        setUsername(newUsername);
        setUsernameModalVisible(false);
        setNewUsername(''); // Clear the input field.
    };

    const handleUpdatePassword = () => {
        AsyncStorage.setItem('userData', JSON.stringify({ email, username, password: newPassword }));
        setPassword(newPassword);
        setPasswordModalVisible(false);
        setNewPassword(''); // Clear the input field.
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.InputContainer}>
                <Text>Email: {email} </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
                        <Text style={styles.changeText}>Change Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InputContainer}>
                <Text>UserName: {username} </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setUsernameModalVisible(true)}>
                        <Text style={styles.changeText}>Change UserName</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.InputContainer}>
                <Text>Password: {'*'.repeat(password.length)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setPasswordModalVisible(true)}>
                        <Text style={styles.changeText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Email Update Modal */}
            <Modal isVisible={isEmailModalVisible}>
                <View style={styles.modalContainer}>
                    <Text>Enter New Email:</Text>
                    <TextInput
                        value={newEmail}
                        onChangeText={(text) => setNewEmail(text)}
                        placeholder="New Email"
                    />
                    <Button title="Update Email" onPress={handleUpdateEmail} color="black" />
                    <Button title="Cancel" onPress={() => setEmailModalVisible(false)} color="black" />
                </View>
            </Modal>

            {/* Username Update Modal */}
            <Modal isVisible={isUsernameModalVisible}>
                <View style={styles.modalContainer}>
                    <Text>Enter New Username:</Text>
                    <TextInput
                        value={newUsername}
                        onChangeText={(text) => setNewUsername(text)}
                        placeholder="New Username"
                    />
                    <Button title="Update Username" onPress={handleUpdateUsername} color="black" paddingHorizontal={15} />
                    <Button title="Cancel" onPress={() => setUsernameModalVisible(false)} color="black" />
                </View>
            </Modal>

            {/* Password Update Modal */}
            <Modal isVisible={isPasswordModalVisible}>
                <View style={styles.modalContainer}>
                    <Text>Enter New Password:</Text>
                    <TextInput
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholder="New Password"
                    />
                    <Button title="Update Password" onPress={handleUpdatePassword} color="black" />
                    <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} color="black" />
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
    InputContainer: {
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
    changeText: {
        color: 'black',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default MyProfile;
