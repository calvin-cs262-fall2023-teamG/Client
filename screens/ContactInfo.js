import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import InputBox from '../components/InputBox';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';

const PlaceholderImage_front = require('../assets/book_icon.png');
const PlaceholderImage_back = require('../assets/book_icon_back.png');


const ContactInfo = ({ navigation }) => {
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

        <View style={styles.shapesContainer}>
                    <View style={styles.shape1} />
                    <View style={styles.shape2} />
                    <View style={styles.shape3} />
                    <View style={styles.shape4} />
                    <View style={styles.shape5} />
                </View>

            <View style={styles.inputs}>
                <InputBox pHolder='Full Name' icon="user"/>
                <InputBox pHolder='E-Mail' icon = "envelope"/>
            </View>
            

            <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
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
    
    shapesContainer: {
        position: 'absolute',
        flexWrap: 'wrap',
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
        marginTop: 5,
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
    shape1: {
        position: 'absolute',
        top: -80,
        left: -80,
        width: 190,
        height: 190,
        borderRadius: 90,
        backgroundColor: '#8CFFD6',
        opacity: 0.5,
    },
    shape2: {
        position: 'absolute',
        width: 200,
        height: 200,
        top: 600,
        left: -29,
        borderRadius: 100,
        backgroundColor: '#A1FFB6',
    },
    shape3: {
        position: 'absolute',
        width: 200,
        height: 250,
        top: 550,
        left: -120,
        borderRadius: 100,
        backgroundColor: '#8CFFD6',
    },
    shape4: {
        position: 'absolute',
        width: 260,
        height: 150,
        left: 200,
        borderRadius: 70,
        backgroundColor: '#8CFFD6',
        transform: [{ rotate: '50deg' }],
    },
    shape5: {
        position: 'absolute',
        width: 280,
        height: 150,
        left: 280,
        borderRadius: 40,
        backgroundColor: '#B4F7C3',
        transform: [{ rotate: '70deg' }],
    },
    

});

export default ContactInfo;
