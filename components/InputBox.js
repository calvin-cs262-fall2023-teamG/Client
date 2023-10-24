import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

export default function InputBox({ pHolder, icon, value, set_text, secureTextEntry, togglePasswordVisibility, showPassword }) {
  const isPassword = secureTextEntry !== undefined && secureTextEntry;
  return (
    <View style={styles.InputContainer}>
      <Icon name={icon} size={20} color='#888181' style={styles.icon} />
      <TextInput
        style={styles.InputTextBox}
        placeholder={pHolder}
        value={value}
        onChangeText={set_text}
        secureTextEntry={isPassword} // Conditionally apply secureTextEntry
      />
      {/*Shows or hides the password based on what the user chooses*/}
      {((togglePasswordVisibility && showPassword) != undefined) && (

        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#888181" style={styles.icon} />
        </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({

  icon: {
    marginLeft: 5,
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
  InputTextBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});