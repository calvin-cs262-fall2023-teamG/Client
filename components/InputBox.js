import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import { Entypo } from '@expo/vector-icons';

export default function AddBookInput({pHolder, icon, entyptoIcon}) {

  return (
    <View style={styles.wrapper}>
        <Icon name={icon} size={20} color="#000" style={styles.icon} />
        
        <TextInput style={styles.input} placeholder={pHolder}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
    backgroundColor : '#D9FFF6',
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: "center" //center vertically
},
icon:{
    marginLeft:5,
},

input:{
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    
},
});