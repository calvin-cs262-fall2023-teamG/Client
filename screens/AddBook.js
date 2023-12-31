/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-unresolved
import DropDownPicker from 'react-native-dropdown-picker';

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
// eslint-disable-next-line import/no-duplicates
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Import uuid from react-native-uuid
import Animated, {
  FadeInLeft, FadeInRight, FadeInDown, FadeInUp,
} from 'react-native-reanimated';
import ModalDropdown from 'react-native-modal-dropdown';
// eslint-disable-next-line import/no-duplicates
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
  const [dollarPrice, setDollarPrice] = useState('');
  const [price, setPrice] = useState('');
  const [id, setID] = useState();
  const [condition, setBookCondition] = useState('Brand New');
  const [selectedImageType, setSelectedImageType] = useState('');

  const bottomSheetRef = useRef();

  const showBottomSheet = (type) => {
    setSelectedImageType(type);
    bottomSheetRef.current.open();
  };

  const hideBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  const handleImageSelection = async (fromCamera) => {
    hideBottomSheet();
    if (selectedImageType === 'front') {
      if (fromCamera) {
        await takePhotoFront();
      } else {
        await chooseFromGalleryFront();
      }
    } else if (selectedImageType === 'back') {
      if (fromCamera) {
        await takePhotoBack();
      } else {
        await chooseFromGalleryBack();
      }
    }
  };

  const handlePrice = (text) => {
    if (!text.startsWith('$')) {
      setDollarPrice(`$${text}`);
    } else {
      setDollarPrice(text);
    }

    const numericPart = text.replace(/\$/g, '');
    setPrice(numericPart);
  };

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
    const uniqueId = uuidv4(); // Generate a unique ID
    const data = {
      // eslint-disable-next-line max-len
      ID: uniqueId, title: book, author, isbn, coursename: courseName, userID: id, price, condition, front_picture: selectedImageFront, back_picture: selectedImageBack,
    };
    setPassedBook(data); // price is excluded during testing due to type mismatch
  }, [book, isbn, author, courseName, price, condition, selectedImageFront, selectedImageBack]);

  // Function to launch the camera to take a photo
  const takePhotoFront = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      const file = result.assets[0].base64;
      setselectedImageFront(`data:image/jpeg;base64,${file}`);
    }
  };

  // Function to launch the image picker to select from the gallery
  const chooseFromGalleryFront = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      base64: true,
    });
    if (!result.canceled) {
      const file = result.assets[0].base64;
      setselectedImageFront(`data:image/jpeg;base64,${file}`);
    } else {
      alert('you did not select any image.');
    }
  };

  // Function to launch the camera to take a photo for imageBack
  const takePhotoBack = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const file = result.assets[0].base64;
      setselectedImageBack(`data:image/jpeg;base64,${file}`);
    }
  };

  // Function to launch the image picker to select from the gallery for imageBack
  const chooseFromGalleryBack = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      base64: true,
    });

    if (!result.canceled) {
      const file = result.assets[0].base64;
      setselectedImageBack(`data:image/jpeg;base64,${file}`);
    }
  };

  const advancePage = async () => {
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
          <InputBox pHolder="Book Name" icon="book" autoCapitalize="words" value={book} set_text={(text) => setBook(text)} />
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
          <InputBox pHolder="Author" icon="user" value={author} autoCapitalize="words" set_text={(text) => setAuthor(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Course name:
          </Text>
          <InputBox pHolder="Course Name" icon="graduation-cap" autoCapitalize="characters" value={courseName} set_text={(text) => setCourseName(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Price:
          </Text>
          <InputBox pHolder="Price" icon="tags" value={dollarPrice} set_text={(text) => handlePrice(text)} />
          <Text style={{
            fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
          }}
          >
            Book Condition:
          </Text>

          <View style={styles.pickerContainer}>
            <FontAwesomeIcon
              name="book"
              style={{
                marginLeft: 15,
                marginTop: 15,
                fontSize: 20,
                color: '#888181',
              }}
            />
            <ModalDropdown
              options={['Brand New', 'Like New', 'Good', 'Acceptable']}
              style={{ marginTop: -30, marginLeft: 40, paddingVertical: 10 }}
              defaultValue={condition}
              defaultIndex={0}
              saveScrollPosition={false}
              onSelect={(index, value) => setBookCondition(value)}
              textStyle={{ fontSize: 16, marginLeft: 10 }}
              dropdownStyle={{
                width: '84%', borderRadius: 15, marginTop: 20,
              }}
              dropdownTextStyle={{ fontSize: 16 }}
            />
          </View>
        </Animated.View>

        {/* React Native Raw Bottom Sheet */}
        <RBSheet
          ref={bottomSheetRef}
          height={170}
          duration={250}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: 'white',
            },
          }}
        >
          <TouchableOpacity
            style={styles.bottomSheetOption}
            onPress={() => handleImageSelection(true)}
          >
            <View style={styles.iconTextContainer}>
              <Icon name="camera" size={24} color="black" style={styles.icon} />
              <Text style={styles.bottomSheetOptionText}>Take a Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetOption}
            onPress={() => handleImageSelection(false)}
          >
            <View style={styles.iconTextContainer}>
              <Icon name="image" size={24} color="black" style={styles.icon} />
              <Text style={styles.bottomSheetOptionText}>Choose from Gallery</Text>
            </View>
          </TouchableOpacity>
          {/* Add Cancel button if needed */}
        </RBSheet>

        <View style={styles.imageContainer}>

          {/* Upload front of the book */}
          <TouchableOpacity onPress={() => showBottomSheet('front')}>
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
          <TouchableOpacity onPress={() => showBottomSheet('back')}>
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
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 25,
  },
  icon: {
    marginRight: 10,
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
  pickerContainer: {
    backgroundColor: '#D9FFF6',
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    height: 50,
  },
});

export default AddBook;
