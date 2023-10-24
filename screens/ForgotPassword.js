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
            <Icon name="book" size={50} color="#000" />
            <Text style={styles.loginheader}> ChapterCache</Text>
          </View>

          <Text style={styles.PageTitle}> Reset Password</Text>
          <Text style={styles.Info}> Please enter your email address </Text>

          {/* sets the state of email address*/}
          <View style={styles.InputContainer}>
            <Icon name="envelope" size={18} color="#888181" style={styles.icon} />
            <TextInput
              style={styles.InputTextBox}
              placeholder={"Email"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <TouchableOpacity onPress={checkAndSend}>
            <View style={styles.resetPasswordButton}>
              <Text>Reset Password</Text>
            </View>
          </TouchableOpacity>

          {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

          <View style={styles.footer}>
            <Text>Know your Password?</Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View>
                  <Text style={styles.CreateAccount}>Sign In</Text>
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
  icon: {
    marginLeft: 5,
  },

  //The styling for UserName and Password text boxes, and icons
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: "#D9FFF6",
    marginBottom: 5,
    borderRadius: 15,
    justifyContent: "center", //center vertically
  },
  InputTextBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  //The styling for the 'Reset Password' Button
  resetPasswordButton: {
    marginTop: 5,
    paddingVertical: 10,
    height: 50,
    backgroundColor: "#81F4D8",
    borderRadius: 15,
    alignItems: "center", //center horizontally
    justifyContent: "center", //center vertically
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

  //Button = 'Create an account'
  CreateAccount: {
    fontSize: 15,
    color: "#00FFC1",
  },
});

export default ForgotPassword;
