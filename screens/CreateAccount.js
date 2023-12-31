/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Text, View, ScrollView, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import uuid from 'react-native-uuid'; // Import uuid from react-native-uuid
import bcrypt from 'react-native-bcrypt';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const saltRounds = 5; // Number of salt rounds, higher is more secure but slower

function CreateAccount({ navigation }) {
  const [fullname, setFullname] = useState(''); // Variables to hold fullname
  const [username, setUsername] = useState(''); // Variables to hold username
  const [password, setPassword] = useState(''); // Variables to hold password
  const [confirmpassword, setconfirmPassword] = useState(''); // The comparator to ensure password correctness
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Determines whether password is visible
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //      ^ Separately determines whether confirmation of password is visible
  const [usererrorMessage, setUserErrorMessage] = useState(''); // Stores error messages
  const [emailerrorMessage, setEmailErrorMessage] = useState(''); // Stores error messages
  const [passworderrorMessage, setPasswordErrorMessage] = useState(''); // Stores error messages

  // Collects the information once it is compiled and builds an account
  const handleCreate = async () => {
    setUserErrorMessage(''); // Reset user error message
    setEmailErrorMessage(''); // Reset email error message
    setPasswordErrorMessage(''); // Reset password error message
    const domainToCheck = 'calvin.edu'; // Ensure use of a Calvin email
    const emailParts = email.split('@');

    // Error messages...
    const usernameresponse = await fetch('https://chaptercachecalvincs262.azurewebsites.net/users');
    const userData = await usernameresponse.json();
    const curuser = userData.find((mycuruser) => mycuruser.username === username);
    if (curuser) {
      setUserErrorMessage('Username already taken. Please try again.');
    } else if (username.length <= 3) { // If the email is too short
      setUserErrorMessage('Your username must be at least 4 characters');
    } else if (!(emailParts.length === 2 && emailParts[1] === domainToCheck)) {
      //          ^ If the email is too short or isn't identified as a Calvin email:
      setEmailErrorMessage('Please enter your Calvin email');
    } else if (password.length <= 7) { // If the password is too short
      setPasswordErrorMessage('Your password must be at least 8 characters');
    } else if (password !== confirmpassword) { // If chosen password doesn't match the confirmation
      setPasswordErrorMessage('Passwords do not match!');
    } else {
      try {
        const uniqueId = uuid.v4(); // Generate a unique ID
        console.log(uniqueId);
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            return;
          }
          const data = {
            ID: uniqueId, name: fullname, emailAddress: email, username, passwordHash: hash,
          };
          console.log(data);
          const response = await fetch('https://chaptercachecalvincs262.azurewebsites.net/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
          }

          // Save user data to AsyncStorage
          navigation.navigate('Login'); // Navigate back to the login page ONLY if the account creation was successful
        });
      } catch (error) {
        console.error(error);
        setPasswordErrorMessage('Error creating account. Please try again.');
      }
    }
  };

  // Password visibility toggle functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.headerContainer}>
            <Icon name="book" size={50} color="#000" />
            <Text style={styles.loginheader}> ChapterCache</Text>
          </View>
          <Text style={styles.PageTitle}> Create an Account</Text>
          <Text style={styles.Info}> Please fill these credentials</Text>
          {/* sets the state of fullname, email, username, and password */}
          <InputBox pHolder="Full Name" icon="user" value={fullname} autoCapitalize="words" set_text={(text) => setFullname(text)} />
          <InputBox pHolder="Username (4 characters or longer)" icon="user" value={username} set_text={(text) => setUsername(text)} />

          {usererrorMessage !== '' && (
            <Text style={styles.errorText}>{usererrorMessage}</Text>
          )}

          <InputBox pHolder="Calvin email" icon="envelope" value={email} set_text={(text) => setEmail(text)} />
          {emailerrorMessage !== '' && (
            <Text style={styles.errorText}>{emailerrorMessage}</Text>
          )}
          <InputBox
            pHolder="Password (8 characters or longer)"
            icon="lock"
            value={password}
            set_text={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <InputBox
            pHolder="Confirm Password"
            icon="lock"
            value={confirmpassword}
            set_text={(text) => setconfirmPassword(text)}
            secureTextEntry={!showConfirmPassword}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
            showPassword={showConfirmPassword}
          />
          {passworderrorMessage !== '' && (
            <Text style={styles.errorText}>{passworderrorMessage}</Text>
          )}

          <Button style="button" label="Create an Account" onPress={handleCreate} />

          {/* Having an account automatically sends you back to the login screen */}
          <View style={styles.footer}>
            <Text style={styles.Infofooter}>Already have an Account?</Text>
            <View>
              <Button style="text" label="Sign In" onPress={() => navigation.navigate('Login')} />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
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
    alignItems: 'center',
    paddingTop: 40,
  },

  // Text = "logo + ChapterCache"
  loginheader: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '700',
  },

  // Text = 'Sign In'
  PageTitle: {
    paddingTop: 70,
    marginBottom: 12,
    fontSize: 35,
    fontWeight: '400',
  },

  // Text = 'Please fill these credentials'
  Info: {
    marginBottom: 40,
    fontSize: 15,
    color: '#888181',
    marginLeft: 10,
  },

  // The styling for UserName and Password text boxes, and icons
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#D9FFF6',
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: 'center', // center vertically
  },

  // Error Message
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#ff0000',
    marginTop: 10,
  },

  // View for the two styles below: Infofooter, CreateAccount
  footer: {
    alignItems: 'center',
    marginTop: 60,
  },

  // Text = 'Already have an Account?'
  Infofooter: {
    fontSize: 17,
    color: '#000000',
  },
});

export default CreateAccount;
