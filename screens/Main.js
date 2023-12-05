/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
import {
  StyleSheet, Text, View, SafeAreaView,
  TouchableOpacity, Dimensions, RefreshControl, FlatList, Image,
}
  from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeIn, FadeInUp } from 'react-native-reanimated';
import Book from '../components/Book';
import books_data from '../books_data';
import InputBox from '../components/InputBox';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

function Main() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // Collects a hardcoded json full of book objects
  const [booksData, setBooksData] = useState(books_data);
  // const [bookInfo, setBookInfo] = useState(booksData); // formats this correctly

  // List of books generation
  // eslint-disable-next-line no-unused-vars
  const [book, setBook] = useState();
  // sets the book list to the hardcoded json.
  // It will be turned instead into the library from the database.
  const [books, setBooks] = useState([]);
  // make a useState boolean which is falsified when library fetch is completed or failed
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLibrary();
    setRefreshing(false);
  };

  // Method to fetch the library of books from the database.
  // Should be executed when page is navigated to.
  const fetchLibrary = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://chaptercachecalvincs262.azurewebsites.net/books');
      const json = await response.json(); // collect a json from the response

      // Filter books based on date_sold
      // eslint-disable-next-line no-shadow
      const filteredBooks = json.filter((book) => book.date_sold === null);

      setBooksData(filteredBooks); // overwrite default values in booksData
      setBooks(filteredBooks); // put the filtered books into our book arrangement
    } catch (error) {
      console.error(error);
      console.log('Using default list values'); // Log that you are using hardcoded values
      setBooks(booksData);
    } finally {
      setLoading(false);
    }
  };

  // The following useEffect initializes the book list
  useEffect(() => {
    fetchLibrary();
  }, []); // This should only happen on page init

  // The useEffect to refresh the page when navigated back/focused again.
  useEffect(() => {
    if (isFocused) {
      fetchLibrary();
    }
  }, [isFocused]);

  // Alters the "books" list to only show books whose title matches with what is in the search bar
  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      // setBooks(booksData);
      fetchLibrary(); // this should only be uncommented when the database is functional
    } else {
      const filteredBooks = booksData.filter((filterbook) => {
        const book_name = filterbook.title.toLowerCase();
        return book_name.includes(searchTerm.toLowerCase());
      });

      setBooks(filteredBooks);
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <Animated.View style={{ alignItems: 'center', marginTop: 16 }} entering={FadeIn.duration(500)}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Books for Sale</Text>
      </Animated.View>

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 3, width: '100%' }} />

      <Animated.View style={{ width: 400, marginBottom: 2 }} entering={FadeInUp.duration(500)}>
        <InputBox pHolder="Search for a book" icon="search" value={book} set_text={handleSearch} autofocus={false} />
      </Animated.View>

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Book Info', { bookInfo: item })}>
            <View style={styles.item}>
              <Image source={{ uri: item.front_picture }} style={styles.image} />
              <Book bookInfo={item} />
              <View style={styles.details}>
                <Text style={{ textDecorationLine: 'underline', color: '#888181' }}>More details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
                  )}
        ListEmptyComponent={() => (
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20,
          }}
          >
            <Text>No books found</Text>
          </View>
        )}
      />

      <View style={styles.footerContainer}>
        <Animated.View entering={FadeInDown.duration(500)}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Book')}
            style={styles.roundButton}
          >
            <Text style={styles.sellBook} entering={FadeIn.duration(500)}>Sell a Book</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

    </SafeAreaView>
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
  image: {
    width: 35,
    height: 45,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'black',
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

export default Main;
