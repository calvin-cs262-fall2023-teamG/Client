
//Button.js

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    
    <View style={styles.screen}>
      <TouchableOpacity
       onPress={onPress}
       style={styles.roundButton1}>
       <Text style={styles.text}>{label}</Text>
     </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
	text: {
	  fontSize: 25,
	  color: '#000000',
    textAlign: 'center',
  },
  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#81F4D8',
  },
});
