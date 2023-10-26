import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputBox from '../components/InputBox';
import Button from '../components/Button';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState(''); // State to store the user's email

    useEffect(() => {
        // Retrieve user data from AsyncStorage when the component mounts
        const retrieveUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { username: storedUsername, email } = JSON.parse(userData);
                    setUsername(storedUsername);
                    setEmail(email);
                    setPassword(password)
                }
            } catch (error) {
                console.error(error);
            }
        };

        retrieveUserData();
    }, []);

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { username: storedUsername, password: storedPassword } = JSON.parse(userData);
                if ((username === storedUsername && password === storedPassword) || (username === 'admin' && password === "admin")) {
                    setErrorMessage(''); // Clear any previous error message
                    // Navigate to the main screen or wherever you want to go
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

            <View style={styles.shapesContainer}>
                <View style={styles.shape1} />
                <View style={styles.shape2} />
                <View style={styles.shape3} />
                <View style={styles.shape4} />
                <View style={styles.shape5} />
            </View>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.headerContainer}>
                        <Icon name="book" size={50} color="#000" style={styles.bookIcon} />
                        <Text style={styles.loginheader}> ChapterCache</Text>
                    </View>

                    <Text style={styles.PageTitle}> Sign in</Text>
                    <Text style={styles.Info}> Please fill these credentials</Text>

                    {/* sets the state of username and password*/}
                    <InputBox pHolder="Username" icon="user" value={username} set_text={text => setUsername(text)}  autofocus = {true} />
                    <InputBox pHolder="Password" icon="lock" value={password}
                        set_text={text => setPassword(text)} secureTextEntry={!showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        showPassword={showPassword}
                        autofocus = {false} />

                    <View style={{ alignItems: 'flex-end' }}>
                        <Button style="text" label="Forgot Password?" onPress={handleResetPassword}/>
                    </View>

                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    
                    <Button style = "button" label="Sign In" onPress={handleLogin}/>

                    <View style={styles.footer}>
                        <Text style={styles.Infofooter}> Don't have an account?</Text>
                        <View>
                            <Button style="text" label="Create an Account" onPress={() => navigation.navigate('CreateAccount')}/>
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
        paddingTop: 40,
        alignItems: "center"
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

    //Error Message
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ff0000',
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

})

export default LoginScreen;
