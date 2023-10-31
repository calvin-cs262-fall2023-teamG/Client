import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import InputBox from '../components/InputBox';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';


const PlaceholderImage_front = require('../assets/book_icon_gray.png'); //Allow for placeholders
const PlaceholderImage_back = require('../assets/book_icon_back_gray.png');

const AddBook = ({ navigation }) => {
    const [selectedImage_front, setSelectedImage_front] = useState(null); //allows to insert new images
    const [selectedImage_back, setSelectedImage_back] = useState(null);

    //Temporary variable list of books for proof of concept
    const [book, setBook] = useState();
    const [isbn, setISBN] = useState();
    const [author, setAuthor] = useState();
    const [course_name, setCourseName] = useState();
    const [price, setPrice] = useState();

    const [books, setBooks] = useState([]);

    const pickImageAsync_front = async () => { //For selection of the image to use for the front of the book, it accesses your image folder
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage_front(result.assets[0].uri);
        }
    }
    const pickImageAsync_back = async () => { //Similar to above, but for the back of the book
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage_back(result.assets[0].uri);
        }
 }

return (
        <View style={styles.container}>
            <ScrollView>
                <InputBox pHolder='Book Name' icon="book" value={book} set_text={text => setBook(text)} />
                <InputBox pHolder='ISBN' icon="hashtag" value={isbn} set_text={text => setISBN(text)} />
                <InputBox pHolder='Author' icon="user" value={author} set_text={text => setAuthor(text)} />
                <InputBox pHolder='Course Name' icon="graduation-cap" value={course_name} set_text={text => setCourseName(text)} />
                <InputBox pHolder='Price' icon="tags" value={price} set_text={text => setPrice(text)} />

                <View style={styles.imageContainer}>

                    {/* Upload front of the book */}
                    <TouchableOpacity onPress={pickImageAsync_front}>
                        <View style={styles.imageSection}>
                            <View>
                                <Text style={styles.text}>Front Picture</Text>
                                <Text style={styles.addImage}> Add Image</Text>
                            </View>
                            <ImageViewer
                                placeholderImageSource={PlaceholderImage_front}
                                selectedImage={selectedImage_front}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Upload back of the book */}
                    <TouchableOpacity onPress={pickImageAsync_back}>
                        <View style={styles.imageSection}>
                            <View >
                                <Text style={styles.text}>Back Picture</Text>
                                <Text style={styles.addImage}>Add Image</Text>
                            </View>
                            <ImageViewer
                                placeholderImageSource={PlaceholderImage_back}
                                selectedImage={selectedImage_back}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Contact Info', book)}>
                         <View style={styles.okButton}>
                        <Text style={{ color: '#000' }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
            </ScrollView>
        </View>
  )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 30,
        paddingTop: 15,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 0,
    },
    imageSection: {
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 5,
    },
    addImage: {
        color: '#81F4D8',
        alignItems: 'center',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25
    },
    okButton: {
        height: 50,
        backgroundColor: '#81F4D8',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        width: 182,
        marginBottom: 20,
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
    }
});

export default AddBook;
