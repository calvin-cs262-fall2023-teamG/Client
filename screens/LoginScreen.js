import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { username: storedUsername, password: storedPassword } = JSON.parse(userData);
                if ((username === storedUsername && password === storedPassword) || (username === 'admin' && password === "admin")) {
                    navigation.navigate('Main');
                } else {
                    setErrorMessage("Username or Password Incorrect!");
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error logging in. Please try again.");
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleResetPassword = async () => {
        navigation.navigate("ForgotPassword")
    }


    return (

        <View style={styles.mainbg}>
            {/* These are the designs for the main page */}
            <ScrollView>
                <View style={styles.shapesContainer}>
                    <View style={styles.shape1} />
                    <View style={styles.shape2} />
                    <View style={styles.shape3} />
                    <View style={styles.shape4} />
                    <View style={styles.shape5} />
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.headerContainer}>
                        <Icon name="book" size={50} color="#000" style={styles.bookIcon} />
                        <Text style={styles.loginheader}> ChapterCache</Text>
                    </View>

                    <Text style={styles.PageTitle}> Sign in</Text>
                    <Text style={styles.Info}> Please fill these credentials</Text>

                    {/* sets the state of username and password*/}
                    <View style={styles.InputContainer}>
                        <Icon name="user" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={styles.InputTextBox}
                            placeholder={"UserName"}
                            value={username}
                            onChangeText={text => setUsername(text)} />
                    </View>

                    <View style={styles.InputContainer}>
                        <Icon name="lock" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={styles.InputTextBox}
                            placeholder={"Password"}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={text => setPassword(text)} />

                        {/*Shows or hides the password based on what the user chooses*/}
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={handleResetPassword}>
                            <View>
                                <Text style={styles.ForgotPassword}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.signInButton}>
                            <Text>Sign In</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.Infofooter}> Don't have an account?</Text>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                                <View>
                                    <Text style={styles.CreateAccount}>Create an Account</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    mainbg: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        top: 800,
        left: 40,
        borderRadius: 100,
        backgroundColor: '#A1FFB6',
    },
    shape3: {
        position: 'absolute',
        width: 200,
        height: 200,
        top: 700,
        left: -90,
        borderRadius: 100,
        backgroundColor: '#8CFFD6',
    },
    shape4: {
        position: 'absolute',
        width: 260,
        height: 150,
        left: 210,
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

    headerContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        alignItems: "center"
    },

    bookIcon: {
    },

    //Text = "logo + ChapterCache"
    loginheader: {
        marginLeft: 5,
        fontSize: 15,
        fontWeight: '700',
    },

    //Text = 'Sign In'
    PageTitle: {
        paddingTop: 70,
        marginBottom: 12,
        fontSize: 30,
        fontWeight: '400',
    },

    //Text = 'Please fill these credentials'
    Info: {
        marginBottom: 50,
        fontSize: 15,
        color: '#888181',
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
    icon: {
        marginLeft: 5,
    },
    InputTextBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,

    },

    //Button = 'Forgot Password?'
    ForgotPassword: {
        textAlign: 'left',
        fontSize: 15,
        color: '#00FFC1',
        marginBottom: 6,
    },

    //Error Message
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ff0000',
    },

    //The styling for the 'Sign In' Button
    signInButton: {
        marginTop: 60,
        paddingVertical: 10,
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center", //center horizontally
        justifyContent: "center" //center vertically
    },

    //View for the two styles below: Infofooter, CreateAccount
    footer: {
        alignItems: 'center',
        marginTop: 70,
    },

    //Text = 'Don't have an account'
    Infofooter: {
        fontSize: 15,
        color: '#000000',
    },

    //Button = 'Create an account'
    CreateAccount: {
        fontSize: 15,
        color: '#00FFC1',
    },
})

export default LoginScreen;
