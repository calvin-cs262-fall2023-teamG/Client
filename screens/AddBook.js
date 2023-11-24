/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'; // Import uuid from react-native-uuid
import Animated, {
  FadeInLeft, FadeInRight, FadeInDown, FadeInUp,
} from 'react-native-reanimated';
import ImageViewer from '../components/ImageViewer';
import InputBox from '../components/InputBox';

const placeholderImageFront = require('../assets/book_icon_gray.png'); // Allow for placeholders
const placeholderImageBack = require('../assets/book_icon_back_gray.png');

function AddBook({ navigation, route }) {
  const [selectedImageFront, setselectedImageFront] = useState(null);
  const [selectedImageBack, setselectedImageBack] = useState(null);
  const [passedBook, setPassedBook] = useState();

  // book aspects
  const [book, setBook] = useState('');
  const [isbn, setISBN] = useState('');
  const [author, setAuthor] = useState('');
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [id, setID] = useState();
  // const [books, setBooks] = useState([]);
  useEffect(() => {
    // Retrieve data from AsyncStorage, same function from ContactInfo
    try {
      const fetchUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { ID } = JSON.parse(userData);
          setID(ID);
          console.log(`Collected ID: ${id}`);
        }
      };
      fetchUserData(); // execute the above function
    } catch (error) {
      console.error(error);
      setID(0); // get rid of unhandled promise rejection?
    }
  }, []);

  // Set the book to pass whenever an aspect is changed
  useEffect(() => {
    const uniqueId = uuid.v4(); // Generate a unique ID
    const data = {
      ID: uniqueId, title: book, author, isbn, coursename: courseName, userID: id, price,
    };
    setPassedBook(data); // price is excluded during testing due to type mismatch
  }, [book, isbn, author, courseName, price]);

  // For selection of the image to use for the front of the book, it accesses your image folder
  const pickImageAsyncFront = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setselectedImageFront(result.assets[0].uri);
    }
  };
  const pickImageAsyncBack = async () => { // Similar to above, but for the back of the book
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setselectedImageBack(result.assets[0].uri);
    }
  };

  const advancePage = () => {
    console.log(`Passing: ${JSON.stringify(passedBook)}`);
    navigation.navigate('Contact Info', { receivedBook: passedBook });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(500)}>
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold',
          }}
          >
            Book name:
          </Text>
          <InputBox pHolder="Book Name" icon="book" value={book} set_text={(text) => setBook(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            ISBN:
          </Text>
          <InputBox pHolder="ISBN" icon="hashtag" value={isbn} set_text={(text) => setISBN(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Author:
          </Text>
          <InputBox pHolder="Author" icon="user" value={author} set_text={(text) => setAuthor(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Course name:
          </Text>
          <InputBox pHolder="Course Name" icon="graduation-cap" value={courseName} set_text={(text) => setCourseName(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Price:
          </Text>
          <InputBox pHolder="Price" icon="tags" value={price} set_text={(text) => setPrice(text)} />
        </Animated.View>

        <View style={styles.imageContainer}>

          {/* Upload front of the book */}
          <TouchableOpacity onPress={pickImageAsyncFront}>
            <Animated.View style={styles.imageSection} entering={FadeInLeft.duration(500)}>
              <View>
                <Text style={styles.text}>Front Picture</Text>
                <Text style={styles.addImage}> Add Image</Text>
              </View>
              <ImageViewer
                placeholderImageSource={placeholderImageFront}
                selectedImage={selectedImageFront}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Upload back of the book */}
          <TouchableOpacity onPress={pickImageAsyncBack}>
            <Animated.View style={styles.imageSection} entering={FadeInRight.duration(500)}>
              <View>
                <Text style={styles.text}>Back Picture</Text>
                <Text style={styles.addImage}>Add Image</Text>
              </View>
              <ImageViewer
                placeholderImageSource={placeholderImageBack}
                selectedImage={selectedImageBack}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={advancePage}>
            <Animated.View style={styles.okButton} entering={FadeInDown.duration(500)}>
              <Text style={{ color: '#000' }}>Next</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
    marginTop: 25,
  },
  okButton: {
    height: 50,
    backgroundColor: '#81F4D8',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});

export default AddBook;
