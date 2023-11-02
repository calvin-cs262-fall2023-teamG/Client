import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import books_data from '../books_data';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import Animated, {SlideInDown, SlideInUp, SlideInLeft, FadeInLeft, FadeInRight, SlideInRight, BounceInRight, BounceInLeft, FadeInDown, BounceInDown, StretchInX, StretchInY, FadeIn, BounceInUp, ZoomIn, FadeInUp, ZoomOut} from 'react-native-reanimated';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width

const booksData = books_data; //Collects a hardcoded json full of book objects

const Main = () => {
    const navigation = useNavigation();

    //List of books generation
    const [book, setBook] = useState();
    const [books, setBooks] = useState([]); //sets the book list to the hardcoded json. It will be turned instead into the library from the database.
    const [isLoading, setLoading] = useState(true); //make a useState boolean which is falsified when library fetch is completed or failed
  
    //Method to fetch the library of books from the database. Should be executed when page is navigated to.
    const fetchLibrary = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://chaptercachecalvin.azurewebsites.net/books'); //this is not working yet, possibly issue with slashes?
            const json = await response.json(); //collect a json from the response
            setBooks(json); //put the json into our book arrangement
        } catch (error) {
            console.error(error);
            console.log("Using default list values"); //Log that you are using hardcoded values
            setBooks(booksData);
        } finally {
            setLoading(false);
        }
    }
    
    //The following useEffect initializes the book list
    useEffect(() => {
            fetchLibrary();
    }, []); //This should only happen on page init

    //Method to add a created book to a list
    function handleAddBook() {
        setBooks([...books, book]);
        setBook(null);
    }

    //Alters the "books" list to only show books whose title matches with what is in the search bar
    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            //setBooks(booksData); 
            fetchLibrary(); //this should only be uncommented when the database is functional
        } else {
            const filteredBooks = booksData.filter((book) => {
                const title = book.title.toLowerCase();
                return title.includes(searchTerm.toLowerCase());
            });

            setBooks(filteredBooks);
        }
    };

    //A function to perform multiple functions upon pressing the "Add Book" button
    //Currently not in use (dynamic book adding is not yet implemented)
    const AddBookPage = () => {
        navigation.navigate("Add Book");
        //const currentBookObject = await book;
        handleAddBook();
    }

    return (

        <SafeAreaView style={styles.container}>
                <Animated.View style={{marginTop:10, width:400}} entering={FadeInUp.duration(500)}>
                    <InputBox pHolder="Search for a book" icon="search" value={book} set_text={handleSearch}  autofocus = {false}/>
                </Animated.View>

                <Animated.View style = {{alignItems:'center', marginTop: 9, marginBottom:5}} entering={FadeIn.duration(500)}>
                    <Text style = {{fontSize:22, fontWeight:'bold',}}>Books for Sale</Text>
                </Animated.View>

                <View style={{borderBottomColor: 'black', borderBottomWidth: 3, width: '100%',}}/>
                {isLoading ? (<ActivityIndicator />) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        books.map((item, index) => { //Creates a viewable entity for storing books, which can be scrolled through
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("Book Info", { bookInfo: item })}/* Allows for books to navigate to their book info page when clicked */>
                                    <View style={styles.item}>

                                        <View style={styles.square}></View>
                                        <Book bookInfo={item} />
                                        <View style={styles.details}>
                                            <Text style={{ textDecorationLine: "underline", color: '#888181' }}>More details</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                )}

                <View style={styles.footerContainer}>
                    <Animated.View entering={FadeInDown.duration(500)}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("Add Book")}
                        style={styles.roundButton}>
                        <Text style={styles.sellBook} entering={FadeIn.duration(500)}>Sell a Book</Text>
                    </TouchableOpacity>
                    </Animated.View>
 
                    {/* <Button label = "Sell a Book" onPress = {() => navigation.navigate("Add Book")} style = "button"/> */}
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
        paddingHorizontal: 10
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
        alignItems: "center",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 10,
    },
    details: {
        position: "absolute",
        bottom: 0,
        right: 10,
        margin: 10,
        color: '#81F4D8'
    },
    footerContainer: {
        position: 'relative',
        margin: 10,
        color: '#81F4D8',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Sell a Book
    roundButton: {
        width: 182,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#81F4D8'
    },
    sellBook: {
        color: '#000',
    },
});

export default Main;