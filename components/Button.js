
//Button.js

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    
    <View>
      <TouchableOpacity
       onPress={onPress}
       style={styles.roundButton1}>
       <Text style={styles.text}>{label}</Text>
     </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#81F4D8',
  },
	text: {
	  fontSize: 25,
	  color: '#000000',
    textAlign: 'center',
  }
});
