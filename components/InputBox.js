/* eslint-disable camelcase */
import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

export default function InputBox({
  pHolder, icon, value, set_text, secureTextEntry, togglePasswordVisibility,
  showPassword, autofocus,
}) {
  const isPassword = secureTextEntry !== undefined && secureTextEntry;
  return (
    <View style={styles.InputContainer}>
      <View style={styles.icon}>
        <Icon name={icon} size={20} color="#888181" />
      </View>
      <TextInput
        style={styles.InputTextBox}
        placeholder={pHolder}
        value={value}
        autoCapitalize="none"
        onChangeText={set_text}
        autoFocus={autofocus}
        secureTextEntry={isPassword} // Conditionally apply secureTextEntry
      />
      {/* Shows or hides the password based on what the user chooses */}
      {((togglePasswordVisibility && showPassword) !== undefined) && (

        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#888181" style={styles.eyeIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // The styling for UserName and Password text boxes, and icons
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#D9FFF6',
    marginTop: 10,
    borderRadius: 15,
    justifyContent: 'center', // center vertically
  },
  icon: {
    marginLeft: 5,
    width: '9%',
  },
  InputTextBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    marginRight: 10,
  },
});
