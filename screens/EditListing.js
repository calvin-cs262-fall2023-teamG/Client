/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import Animated, {
  BounceIn, FadeIn, Keyframe, useSharedValue, useDerivedValue, withSpring, multiply, FadeOut,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import Button from '../components/Button';
import InputBox from '../components/InputBox';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

// The placeholder images need to be fetched from the database later.
const PlaceholderImageFront = require('./images/image3.jpg');
const PlaceholderImageBack = require('./images/image2.jpg');

// eslint-disable-next-line max-len

function EditListing({ route }) {
  const { bookInfo } = route.params;
  const navigation = useNavigation();
  const [condition, setBookCondition] = useState('Brand New');
  const [editButtonText, setEditButtonText] = useState('Edit'); // Initial button text
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedBookInfo, setUpdatedBookInfo] = useState({
    // Initialize with existing bookInfo values
    title: bookInfo.title,
    isbn: bookInfo.isbn,
    author: bookInfo.author,
    coursename: bookInfo.coursename,
    price: bookInfo.price,
    userid: bookInfo.userid,
    ID: bookInfo.id,
    date_sold: bookInfo.date_sold,
    condition: bookInfo.condition,
    front_picture: bookInfo.front_picture,
    back_picture: bookInfo.back_picture,

    // Add more fields as needed
  });
  // Add a new animated value for shake animation
  const shakeAnimationValue = useSharedValue(0);
  const [isUnderlayTextVisible, setUnderlayTextVisible] = useState(false);

  const tipAnimation = () => {
    shakeAnimationValue.value = 1; // Trigger the animation
    setUnderlayTextVisible(true);
    console.log('animation triggered...');
  };
  setTimeout(() => {
    setUnderlayTextVisible(false);
  }, 4000);

  // Set up the shake animation
  // eslint-disable-next-line max-len
  const shakeAnimation = useDerivedValue(() => withSpring(shakeAnimationValue.value, { damping: 2, stiffness: 150 }));

  // Attach the animated styles to the Animated.View
  const animatedStyles = {
    // eslint-disable-next-line max-len
    transform: [{ translateX: shakeAnimation * 5 }], // Adjust the multiplier for the desired shake range
  };

  const [buttonPressed, setButtonPressed] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // eslint-disable-next-line max-len
        <Animated.View entering={BounceIn.duration(500)} styles={animatedStyles}>
          <TouchableOpacity onPress={async () => {
          // Call handleUpdate first before logging
            if (isEditMode) {
              await handleUpdate();
            }
            console.log(updatedBookInfo);
            handleEditButtonPress(setEditButtonText, isEditMode, setIsEditMode);
          }}
          >
            <Text style={{
              paddingHorizontal: 10, color: '#000', fontSize: 17, fontWeight: 'bold',
            }}
            >{editButtonText}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ),
    });
  }, [editButtonText, isEditMode, updatedBookInfo]);

  const handleStatusToggle = () => {
    const currentDate = new Date().toISOString(); // Get the current date in ISO format
    const newDateSold = buttonPressed ? null : currentDate;

    setUpdatedBookInfo({ ...updatedBookInfo, date_sold: newDateSold });
    setButtonPressed(!buttonPressed);
    console.log(updatedBookInfo);
  };

  const getButtonStyles = () => {
    const styles = buttonPressed
      ? { backgroundColor: '#de0d45', color: '#de0d45' }
      : { backgroundColor: '#81F4D8', color: '#81F4D8' };

    return styles;
  };

  const getButtonLabel = () => (buttonPressed ? 'Status: Sold (Click to change)' : 'Status: For Sale (Click to change)');

  // Define updatedBookInfo state

  // Use useEffect to set buttonPressed when the component mounts
  useEffect(() => {
    // Set the buttonPressed state based on the date_sold field
    setButtonPressed(updatedBookInfo.date_sold !== null);
  }, [updatedBookInfo.date_sold]);

  const handleUpdate = async () => {
    console.log(`Attempting to update book with ID: ${bookInfo.id}`);
    console.log('Originial: ', updatedBookInfo);

    try {
      const response = await fetch(`https://chaptercachecalvincs262.azurewebsites.net/books/${bookInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBookInfo),
      });

      if (!response.ok) {
        const errorResponse = await response.text(); // Change to text() to get HTML response
        console.error('Book update failed:', errorResponse);
        throw new Error('Book update failed');
      }
      // Navigate to the home page
      navigation.navigate('My Listings');
      console.log('Book updated successfully:', updatedBookInfo);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  const handleEditButtonPress = async () => {
    // If in edit mode, perform any necessary logic (e.g., save changes)

    if (isEditMode) {
      // Example: Trigger the handleUpdate function to save changes
      console.log(updatedBookInfo);
      console.log('Save button pressed!');
      handleUpdate();
    } else {
      // If not in edit mode, toggle the edit mode and update the button text
      console.log('Edit button pressed!');
      setIsEditMode(!isEditMode);
      setEditButtonText(isEditMode ? 'Edit' : 'Save');
    }
  };
  const frontImageSource = bookInfo.front_picture ? bookInfo.front_picture : PlaceholderImageFront;
  const backImageSource = bookInfo.back_picture ? bookInfo.back_picture : PlaceholderImageBack;

  return (

    <SafeAreaView style={styles.container}>
      {isUnderlayTextVisible && (
        <Animated.View
          style={styles.underlayTextContainer}
          entering={BounceIn.duration(500)}
          exiting={FadeOut}
        >
          <Text style={styles.underlayText}>Click 'Edit' to make changes</Text>
        </Animated.View>
      )}

      {isEditMode ? null : (
        <View
          style={styles.underlayTouchable}
          onTouchStart={tipAnimation}
        />
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <View style={{ ...styles.topButton, ...getButtonStyles() }}>
          <Button
            style={{ ...getButtonStyles() }}
            label={getButtonLabel()}
            onPress={handleStatusToggle}
          />
        </View>

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold',
        }}
        >
          Book name:
        </Text>
        <InputBox name="Book" icon="book" value={updatedBookInfo.title} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, title: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          ISBN:
        </Text>
        <InputBox name="ISBN" icon="hashtag" value={updatedBookInfo.isbn} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, isbn: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          Author:
        </Text>
        <InputBox name="Author" icon="user" value={updatedBookInfo.author} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, author: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          Course name:
        </Text>
        <InputBox name="Course Name" icon="graduation-cap" value={updatedBookInfo.coursename} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, coursename: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          Price:
        </Text>
        <InputBox name="Price" icon="tags" value={(updatedBookInfo.price !== null ? updatedBookInfo.price.toString() : '0')} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, price: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10, marginBottom: 7,
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
            defaultValue={updatedBookInfo.condition}
            saveScrollPosition={false}
            // eslint-disable-next-line max-len
            onSelect={(index, value) => {
              console.log('Selected index:', index);
              setUpdatedBookInfo({ ...updatedBookInfo, condition: value });
            }}
            textStyle={{ fontSize: 16, marginLeft: 10 }}
            dropdownStyle={{
              width: '84%', borderRadius: 15, marginTop: 20,
            }}
            dropdownTextStyle={{ fontSize: 16 }}
          />
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageSection}>
            <Text style={styles.text}>Front Picture</Text>
            <Image source={{ uri: frontImageSource }} style={styles.image} />
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.text}>Back Picture</Text>
            <Image source={{ uri: backImageSource }} style={styles.image} />
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  info: {
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    width: boxWidth,
    alignItems: 'center',
    backgroundColor: '#D9FFF6',
    borderRadius: 15,
    justifyContent: 'left',
    paddingHorizontal: 15,
  },

  icon: {
    marginRight: 10,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10,
  },

  imageSection: {
    alignItems: 'center',
    marginRight: 20,
  },

  image: {
    width: 150,
    height: 200,
    borderWidth: 4,
    borderColor: 'black',
  },

  text: {
    fontSize: 20,
    marginBottom: 5,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 0,
    padding: 5,
    borderRadius: 15,
    marginBottom: 25,
    paddingVertical: 15,
  },
  pickerContainer: {
    backgroundColor: '#D9FFF6',
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
    height: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  underlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#888181',
    opacity: 0.1,
    pointerEvents: 'auto',
  },
  underlayTextContainer: {
    position: 'absolute',
    top: screenHeight / 2 - 100, // Adjust the position as needed
    left: screenWidth / 2 - boxWidth / 3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    zIndex: 2,
  },

  underlayText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditListing;
