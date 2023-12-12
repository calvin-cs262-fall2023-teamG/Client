/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
import {
  StyleSheet, Text, View, SafeAreaView,
  TouchableOpacity, Dimensions, RefreshControl, FlatList, Image, TextInput, LogBox,
}
  from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeIn, FadeInUp } from 'react-native-reanimated';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Book from '../components/Book';
import books_data from '../books_data';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

/**
 * Provides the main page of the ChapterCache app, which includes components such as
 * search bar, book list, and tab nagivation.
 * @returns UI for the main page, including the search bar, book list, and tab navigation using the styles StyleSheet.
 */
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
  const [searchCategory, setSearchCategory] = useState('Title');

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
        let book_name = '';
        if (searchCategory === 'Title') {
          book_name = filterbook.title.toLowerCase();
        } else if (searchCategory === 'Course Name') {
          book_name = filterbook.coursename.toLowerCase();
        } else if (searchCategory === 'Author') {
          book_name = filterbook.author.toLowerCase();
        }
        return book_name.includes(searchTerm.toLowerCase());
      });

      setBooks(filteredBooks);
    }
  };
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (

    <SafeAreaView style={styles.container}>
      <Animated.View style={{ alignItems: 'center', marginTop: 16 }} entering={FadeIn.duration(500)}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Books for Sale</Text>
      </Animated.View>

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 3, width: '100%' }} />
      <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
        <View style={{ flex: 3 }}>
          <Animated.View style={{ width: '100%', marginBottom: 2 }} entering={FadeInUp.duration(500)}>
            <View style={styles.InputContainer}>
              <View style={styles.icon}>
                <Icon name="search" size={20} color="#888181" />
              </View>
              <TextInput
                style={styles.InputTextBox}
                placeholder="Search for a book"
                value={book}
                onChangeText={handleSearch}
              />
            </View>
          </Animated.View>
        </View>
        <View style={{
          flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
        }}
        >
          <View style={[styles.pickerContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <ModalDropdown
              options={['Title', 'Course Name', 'Author']}
              defaultValue="Title"
              defaultIndex={0}
              saveScrollPosition={false}
              onSelect={(index, value) => setSearchCategory(value)}
              textStyle={{
                fontSize: 15, color: '#888181', marginLeft: 10, flexWrap: 'wrap', textAlign: 'left',
              }}
              dropdownStyle={{
                width: '35%', borderRadius: 25,
              }}
              dropdownTextStyle={{
                fontSize: 16, width: '87%', flexWrap: 'wrap', textAlign: 'left',
              }}
            />
            <View style={{ marginRight: 10 }}>
              <Icon name="caret-down" size={20} color="#888181" />
            </View>
          </View>
        </View>
      </View>
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
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: '#81F4D8',
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
    height: 50,
    width: 95,
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
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 270,
    paddingHorizontal: 15,
    backgroundColor: '#D9FFF6',
    marginTop: 10,
    borderRadius: 15,
    justifyContent: 'left', // center vertically
  },
  icon: {
    marginLeft: 5,
    width: '9%',
  },
  InputTextBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Main;
