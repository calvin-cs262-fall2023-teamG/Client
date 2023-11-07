//This Button componenent creates either a boxed button or a text button depending on the parameter passed.
// It uses the label and onPress parameters too
//
// How to use <Button>?
// - style: it can either be a 'button' or 'text'. It depends on where you button has a background in the back or not
// - label: the text that goes in the button
// - onPress: The result to the buttonpress action

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Button({ label, onPress , style}) {
  const buttonstyle = style==="button" ? styles.button : {}; //If the button is a "Button," it will have a dedicated area
  const textstyle = style==="text" ? styles.text:{}; //If the button is a "Text," only the text will be pressed
  const smallbutton = style==="small button" ? styles.smallButton:{};
  if (style=== "button") {
    return ( 
      <TouchableOpacity onPress={onPress}>
        <View style={buttonstyle}>
          <Text style = {textstyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  else {
    return ( 
      <TouchableOpacity onPress={onPress}>
        <View style={smallbutton}>
          <Text style = {textstyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 10,
    height: 50,
    backgroundColor: '#81F4D8',
    borderRadius: 15,
    alignItems: "center", //center horizontally
    justifyContent: "center" //center vertically
  },
  text: {
    fontSize: 15,
    color: '#00FFC1',
  },
  smallButton: {
    width: 190,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#81F4D8',
    marginBottom: 30,
  }
});
