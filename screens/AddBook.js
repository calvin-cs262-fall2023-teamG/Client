import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import InputBox from '../components/InputBox';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';

const PlaceholderImage_front = require('../assets/favicon.png');
const PlaceholderImage_back = require('../assets/favicon.png');


const AddBook = ({ navigation }) => {
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
      <ScrollView>
        <View style={styles.container}>
            <InputBox pHolder='Book Name' icon="book"/>
            <InputBox pHolder='ISBN' icon = "hashtag"/>
            <InputBox pHolder='Author' icon = "user"/>
            <InputBox pHolder='Course Name' icon = "book"/>
            <InputBox pHolder='Price' icon = "tags"/>

            <View style = {styles.imageContainer}>
                {/* Upload front of the book */}
                <View style = {styles.imageSection}>
                    <TouchableOpacity onPress={pickImageAsync_front}>
                    <View>
                        <Text style = {styles.text}>Front picture</Text>
                    </View>
                    </TouchableOpacity>
                    <ImageViewer
                        placeholderImageSource={PlaceholderImage_front}
                        selectedImage={selectedImage_front}
                    />
                </View>

                {/* Upload back of the book */}
                <View style = {styles.imageSection}>
                    <TouchableOpacity onPress={pickImageAsync_back}>
                    <View >
                        <Text style = {styles.text}>Back picture</Text>
                    </View>
                    </TouchableOpacity>
                    <ImageViewer
                        placeholderImageSource={PlaceholderImage_back}
                        selectedImage={selectedImage_back}
                    />
                </View>
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress={()  =>
                    Alert.alert('Contact Info', 'Name: \nEmail:', [               
                    {text: 'OK'},
                    ])}>
                <View style={styles.contact}>
                        <Text >Buyer Info</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                    <View style={styles.okButton}>
                        <Text >OK</Text> 
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
    imageSection: {
        alignItems: 'center',
    },
    
    text: {
        fontSize: 20,
        marginBottom: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 45,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginLeft: 10,
    },

});

export default AddBook;
