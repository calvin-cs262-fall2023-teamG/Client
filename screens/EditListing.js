/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import InputBox from '../components/InputBox';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

function InfoView({ name, value, icon }) {
  return (
    <View style={[styles.info]}>
      <Icon name={icon} size={20} color="#888181" style={styles.icon} />
      <View>
        <Text style={{ fontWeight: 'bold', color: '#888181' }}>{name}</Text>
        <Text style={{ color: '#888181' }}>{value}</Text>
      </View>
    </View>
  );
}

// The placeholder images need to be fetched from the database later.
const PlaceholderImageFront = require('./images/image3.jpg');
const PlaceholderImageBack = require('./images/image2.jpg');

function EditListing({ route }) {
  const { bookInfo } = route.params;
  const navigation = useNavigation();
  console.log(bookInfo);

  const [buttonPressed, setButtonPressed] = useState(false);

  const handleStatusToggle = () => {
    setButtonPressed(!buttonPressed);
    // Add any other logic or state changes you need when the button is pressed.
  };

  const getButtonStyles = () => {
    const styles = buttonPressed
      ? { borderColor: '#de0d45', color: '#de0d45' }
      : { borderColor: '#81F4D8', color: '#81F4D8' };

    console.log('Button Styles:', styles);

    return styles;
  };

  const getButtonLabel = () => (buttonPressed ? 'Status: Sold' : 'Status: For Sale');

  // Define updatedBookInfo state
  const [updatedBookInfo, setUpdatedBookInfo] = useState({
    // Initialize with existing bookInfo values
    title: bookInfo.title,
    isbn: bookInfo.isbn,
    author: bookInfo.author,
    coursename: bookInfo.coursename,
    price: bookInfo.price,
    name: bookInfo.name,
    emailaddress: bookInfo.emailaddress,
    userid: bookInfo.userid,
    // Add more fields as needed
  });

  const handleUpdate = async () => {
    console.log(`Attempting to update book with ID: ${bookInfo.id}`);
    console.log('Updated Book Info:', updatedBookInfo);

    try {
      const response = await fetch(`https://chaptercachecalvincs262.azurewebsites.net/books/update/${bookInfo.id}`, {
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
      navigation.navigate('Main');
      console.log('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          Seller name:
        </Text>
        <InputBox name="Seller Name" icon="user" value={updatedBookInfo.name} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, name: text })} />

        <Text style={{
          fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 10,
        }}
        >
          Seller email:
        </Text>
        <InputBox name="Seller Email" icon="envelope" value={updatedBookInfo.emailaddress} set_text={(text) => setUpdatedBookInfo({ ...updatedBookInfo, emailaddress: text })} />

        <View style={styles.imageContainer}>
          <View style={styles.imageSection}>
            <Text style={styles.text}>Front Picture</Text>
            <Image source={PlaceholderImageFront} style={styles.image} />
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.text}>Front Picture</Text>
            <Image source={PlaceholderImageBack} style={styles.image} />
          </View>
        </View>

        <View style={styles.button}>
          <Button style="small button" label="Save changes" onPress={() => handleUpdate()} />
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
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    marginBottom: 8,
  },
});

export default EditListing;
