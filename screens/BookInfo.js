/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Animated, { ZoomIn } from 'react-native-reanimated';
import sendEmail from '../components/sendEmail';
import InputBox from '../components/InputBox';

function InfoView({ name, value, icon }) {
  const infoWidth = Dimensions.get('window').width * 0.92;

  return (
    <View style={[styles.info, { width: infoWidth }]}>
      <Icon name={icon} size={20} color="#888181" style={styles.icon} />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontWeight: 'bold', color: '#888181' }}>{name}</Text>
            <Text style={{ color: '#888181' }}>{value}</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

// The placeholder images need to be fetched from the database later.
const PlaceholderImageFront = require('./images/image3.jpg');
const PlaceholderImageBack = require('./images/image2.jpg');

function BookInfo({ route }) {
  const { bookInfo } = route.params;
  const handleContactSeller = () => {
    // Pass the necessary data to the sendEmail function
    sendEmail(bookInfo.title, bookInfo.emailaddress, bookInfo.name);
  };
  const infoWidth = Dimensions.get('window').width * 0.92;
  const frontImageSource = bookInfo.front_picture ? bookInfo.front_picture : PlaceholderImageFront;
  const backImageSource = bookInfo.back_picture ? bookInfo.back_picture : PlaceholderImageBack;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <InfoView name="Book" icon="book" value={bookInfo.title} />
        <InfoView name="ISBN" icon="hashtag" value={bookInfo.isbn} />
        <InfoView name="Author" icon="user" value={bookInfo.author} />
        <InfoView name="Course Name" icon="graduation-cap" value={bookInfo.coursename} />
        <InfoView name="Price" icon="tags" value={`$${bookInfo.price}`} />
        <InfoView name="Seller Name" icon="user" value={bookInfo.name} />
        <InfoView name="Condition" icon="user" value={bookInfo.condition} />
        <View style={[styles.info, { width: infoWidth }]}>
          <Icon name="envelope" size={20} color="#888181" style={styles.icon} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', color: '#888181' }}>Seller Email</Text>
                <Text style={{ color: '#888181' }}>{bookInfo.emailaddress}</Text>
              </View>

              <TouchableOpacity onPress={handleContactSeller}>
                <View style={styles.buttonContact}>
                  <Text>Contact Seller</Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>
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

        <View style={styles.button}>

          {/* This is a bug to fix a bug DON'T TOUCH */}
          <Modal>
            <Animated.View style={styles.modalContainer} entering={ZoomIn.duration(500)}>
              <Text paddingHorizontal={10}>Enter New Email:</Text>
              <InputBox pHolder="New Email" icon="envelope" />
            </Animated.View>
          </Modal>
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
  buttonContact: {
    marginTop: 10,
    paddingVertical: 10,
    marginHorizontal: 70,
    marginBottom: 10,
    height: 40,
    width: 130,
    backgroundColor: '#81F4D8',
    borderRadius: 15,
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
  },

});

export default BookInfo;
