//Button.js

import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';

export default function Button({ label }) {
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };
  
  return (
    
    <View style={styles.screen}>
      <TouchableOpacity
       onPress={buttonClickedHandler}
       style={styles.roundButton1}>
       <Text style={styles.text}>{label}</Text>
     </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
	text: {
	  fontSize: 50,
	  color: '#000',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});
