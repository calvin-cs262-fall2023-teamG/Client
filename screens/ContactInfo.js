import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import InputBox from '../components/InputBox';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';
import Book from '../components/Book';

const PlaceholderImage_front = require('../assets/book_icon.png');
const PlaceholderImage_back = require('../assets/book_icon_back.png');


const ContactInfo = ({ navigation, book }) => {
    const [selectedImage_front, setSelectedImage_front] = useState(null);
    const [selectedImage_back, setSelectedImage_back] = useState(null);
    
     

    const pickImageAsync_front = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
     });
     if (!result.canceled) {
        setSelectedImage_front(result.assets[0].uri);
      }
    }
    const pickImageAsync_back = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
     });
     if (!result.canceled) {
        setSelectedImage_back(result.assets[0].uri);
      }
    }

    return (
      <ScrollView style={styles.container}>
        <View>

            <View style={styles.inputs}>
                <InputBox pHolder='Full Name' icon="user"/>
                <InputBox pHolder='E-Mail' icon = "envelope"/>
            </View>

                      

            <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main', book )}>
                    <View style={styles.okButton}>
                        <Text >Add Book</Text> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    inputs:{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        marginTop: 200
    },
    
    text: {
        fontSize: 20,
        marginBottom: 5,
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 225,
        alignItems: 'center'
    },
    contact: {
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    okButton: {
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        width: 182
    },
    

});

export default ContactInfo;
