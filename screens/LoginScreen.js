/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable object-property-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import bcrypt from 'react-native-bcrypt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, Keyframe } from 'react-native-reanimated';
import Button from '../components/Button';
import InputBox from '../components/InputBox';

// get height dimensions of the screen
const screenHeight = Dimensions.get('screen').height;

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(''); // create username, password variables
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Displays a message in case the user does something incorrectly
  const [email, setEmail] = useState(''); // State to store the user's email
  const [name, setName] = useState(''); // State to store the user's email
  const [matchingUser, setMatchingUser] = useState(null);
  // make a useState boolean which is falsified when library fetch is completed or failed
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // Add a refresh state to force a re-render
  const saltRounds = 10; // Number of salt rounds, higher is more secure but slower

  // Setup the animation for the header
  const keyframe = new Keyframe({
    0: {
      transform: [{ scale: 1.5 }, { translateY: screenHeight / 4 }, { translateX: 80 }],
    },

    65: {
      transform: [{ scale: 1.5 }, { translateY: screenHeight / 4 }, { translateX: 80 }],
    },

    100: {
      transform: [{ scale: 1 }, { translateY: 0 }, { translateX: 0 }],
    },
  });

  useEffect(() => {
    // Retrieve user data from AsyncStorage when the component mounts
    const retrieveUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://chaptercachecalvincs262.azurewebsites.net/users');
        const userData = await response.json();

        // Look for the user by username
        const user = userData.find((user) => user.username === username);
        setErrorMessage(''); // Clear any previous error message
        setMatchingUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    retrieveUserData();
  }, [username, password]); // This useEffect is triggered as soon as the component appears

  const resetInputs = () => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  const handleLogin = async () => {
    try {
      if (matchingUser) {
        const enteredPassword = password; // Get this from user input
        console.log(matchingUser);
        // Compare what the user inputted with the hashed password in the database
        const isPasswordCorrect = bcrypt.compareSync(enteredPassword, matchingUser.passwordhash);
        if (isPasswordCorrect) {
          // Store user information in AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify({
            ID: matchingUser.id, fullname: matchingUser.name, email: matchingUser.emailaddress,
            username: matchingUser.username, password: enteredPassword,
          }));
          // Password is correct, navigate to the main screen
          navigation.navigate('Main');
          resetInputs(); // Reset input fields and error message
          setRefresh((prevState) => !prevState); // Toggle refresh state to force
        } else {
          setErrorMessage('Username or Password Incorrect!');
        }
      } else {
        setErrorMessage('Username or Password Incorrect!');
      }
    } catch (error) {
      setErrorMessage('Uh-oh Something went wrong');
      console.error('Error during password comparison:', error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Make the password (in)visible
  };

  const handleResetPassword = async () => {
    navigation.navigate('ForgotPassword'); // allows to access the reset password page
  };

  return (

    <View style={styles.mainbg}>
      {/* These are the designs for the main page */}

      <Animated.View style={styles.shapesContainer}>
        <View style={styles.shape1} />
        <View style={styles.shape2} />
        <View style={styles.shape3} />
        <View style={styles.shape4} />
        <View style={styles.shape5} />
      </Animated.View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Animated.View style={styles.headerContainer} entering={keyframe.duration(1500)}>
            <Icon name="book" size={50} color="#000" /* Corner logo object */ />
            <Text style={styles.loginheader}> ChapterCache</Text>
          </Animated.View>

          <Animated.Text style={styles.PageTitle} entering={FadeIn.delay(1500)}>
            Sign in
          </Animated.Text>
          <Animated.Text style={styles.Info} entering={FadeIn.delay(1500)}>
            Please fill these credentials
          </Animated.Text>

          {/* sets the state of username and password */}
          <Animated.View entering={FadeIn.delay(1500)}>
            <InputBox pHolder="Username" icon="user" value={username} set_text={(text) => setUsername(text)} autofocus={false} />
            <InputBox
              pHolder="Password"
              icon="lock"
              value={password}
              set_text={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              autofocus={false}
            />
          </Animated.View>

          {/* <Animated.View style={{ alignItems: 'flex-end', marginTop: 5 }} entering={FadeIn.delay(1500)}>
            <Button style="text" label="Forgot Password?" onPress={handleResetPassword} />
          </Animated.View> */}

          {errorMessage !== '' && ( // Handling display of the error message properly
          <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <Animated.View entering={FadeIn.delay(1500)}>
            <Button style="button" label="Sign In" onPress={handleLogin} />
          </Animated.View>

          <Animated.View style={styles.footer} entering={FadeIn.delay(1500)}>
            <Text style={styles.Infofooter}> Don't have an account?</Text>
            <View>
              <Button style="text" label="Create an Account" onPress={() => navigation.navigate('CreateAccount')} />
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>

  );
}

// Styles sheet for this document
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
    left: 40,
    borderRadius: 100,
    backgroundColor: '#A1FFB6',
    transform: [{ translateY: screenHeight - 30 }],
  },
  shape3: {
    position: 'absolute',
    width: 200,
    height: 200,
    left: -90,
    borderRadius: 100,
    backgroundColor: '#8CFFD6',
    transform: [{ translateY: screenHeight - 120 }],
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
    alignItems: 'center',
    zIndex: 1,
  },

  // Text = "logo + ChapterCache"
  loginheader: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '700',
  },

  // Text = 'Sign In'
  PageTitle: {
    paddingTop: 85,
    marginBottom: 12,
    fontSize: 40,
    fontWeight: '400',
  },

  // Text = 'Please fill these credentials'
  Info: {
    marginBottom: 40,
    fontSize: 15,
    color: '#888181',
  },

  // Error Message
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#ff0000',
  },

  // View for the two styles below: Infofooter, CreateAccount
  footer: {
    alignItems: 'center',
    marginTop: 70,
  },

  // Text = 'Don't have an account'
  Infofooter: {
    fontSize: 17,
    color: '#000000',
  },

});

export default LoginScreen;
