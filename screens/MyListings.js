/* eslint-disable camelcase */
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from '../components/Book';
// eslint-disable-next-line camelcase

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

function MyListings() {
  const [userID, setUserID] = useState('');

  // sets the book list to the hardcoded json.
  // It will be turned instead into the library from the database.
  const [books, setBooks] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const response = JSON.parse(userData);
          setUserID(response.ID);
        }
      } catch (error) {
        console.error(error);
      }
    };

    retrieveUserData();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://chaptercachecalvincs262.azurewebsites.net/books');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Filter books based on userID
      const userBooks = data.filter((book) => book.userid === userID);
      console.log('User books:', userBooks); // Log the filtered books

      setBooks(userBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // The useEffect to refresh the page when navigated back/focused again.
  useEffect(() => {
    if (isFocused) {
      fetchBooks();
    }
  }, [isFocused, userID]);

  return (

    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {books.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Edit Listing', { bookInfo: item })}
          >
            <View style={styles.item}>
              <View style={styles.square} />
              <Book bookInfo={item} />
              <View style={styles.details}>
                <Text style={{ textDecorationLine: 'underline', color: '#888181' }}>More details</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#D9FFF6',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: 10,
    width: boxWidth,
    borderWidth: 1,
    borderColor: '#fff',
  },
  square: {
    width: 28,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    margin: 10,
    color: '#81F4D8',
  },
  footerContainer: {
    position: 'relative',
    margin: 10,
    color: '#81F4D8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sell a Book
  roundButton: {
    width: 182,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#81F4D8',
  },
  sellBook: {
    color: '#000',
  },
});

export default MyListings;
