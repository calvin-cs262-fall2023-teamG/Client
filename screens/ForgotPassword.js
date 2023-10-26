import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // You can choose any icon set you prefer
import sendEmail from '../components/sendEmail';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  
  const checkEmailDomain = async () => {
     const domainToCheck = 'calvin.edu';
     const emailParts = email.split('@');

     if (emailParts.length === 2 && emailParts[1] === domainToCheck){
        showAlert() 
        navigation.navigate('Login');
     } else{
        setErrorMessage("Please enter your Calvin email");
     }
  }

  const checkAndSend = () => {
    checkEmailDomain();

    // Sending the email requires 
    //sendEmail();
    }
  

  const showAlert = () => {
    Alert.alert(
      "Resetting Password",
      "Please check your email for further instructions.",
      [{text: "OK"}]
    )
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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.headerContainer}>
            <Icon name="book" size={50} color="#000" style={styles.bookIcon} />
            <Text style={styles.loginheader}> ChapterCache</Text>
          </View>

          <Text style={styles.PageTitle}> Reset Password</Text>
          <Text style={styles.Info}> Please enter your email address </Text>

          {/* sets the state of email address*/}
     
          <InputBox pHolder="Email" icon="envelope" value={email} set_text={text => setEmail(text)} />

          <Button style = "button" label="Reset Password" onPress={checkAndSend}/>

          {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

          <View style={styles.footer}>
            <Text style={styles.Infofooter}>Know your Password?</Text>
            <View>
              <Button style = "text" label="Sign In" onPress={() => navigation.navigate("Login")}/>
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
    backgroundColor: "#ffffff",
  },
  shapesContainer: {
    position: "absolute",
    flexWrap: "wrap",
  },
  shape1: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 90,
    backgroundColor: "#8CFFD6",
    opacity: 0.5,
  },
  shape2: {
    position: "absolute",
    width: 200,
    height: 200,
    top: 800,
    left: 40,
    borderRadius: 100,
    backgroundColor: "#A1FFB6",
  },
  shape3: {
    position: "absolute",
    width: 200,
    height: 200,
    top: 700,
    left: -90,
    borderRadius: 100,
    backgroundColor: "#8CFFD6",
  },
  shape4: {
    position: "absolute",
    width: 260,
    height: 150,
    left: 210,
    borderRadius: 70,
    backgroundColor: "#8CFFD6",
    transform: [{ rotate: "50deg" }],
  },
  shape5: {
    position: "absolute",
    width: 280,
    height: 150,
    left: 280,
    borderRadius: 40,
    backgroundColor: "#B4F7C3",
    transform: [{ rotate: "70deg" }],
  },

  headerContainer: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
  },

  //Text = "logo + ChapterCache"
  loginheader: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "700",
  },

  //Text = 'Reset Password'
  PageTitle: {
    marginTop: 160,
    marginBottom: 12,
    fontSize: 40,
    fontWeight: "400",
  },

  Info: {
    marginBottom: 40,
    fontSize: 15,
    color: "#888181",
    paddingLeft: 10,
  },

  //Error Message
  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: "#ff0000",
  },

  //View for the two styles below: Infofooter, CreateAccount
  footer: {
    alignItems: "center",
    marginTop: 10,
  },

});

export default ForgotPassword;
