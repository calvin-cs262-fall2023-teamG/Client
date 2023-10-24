import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import books_data from '../books_data';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

const booksData = books_data

const Main = () => {
    const navigation = useNavigation();

    //Temporary variable list of books for proof of concept
    const [book, setBook] = useState();
    const [books, setBooks] = useState(booksData);

    //The list of books is created like such
    function handleAddBook() {
        //Keyboard.dismiss();
        setBooks([...books, book]);
        setBook(null);
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setBooks(booksData);
        } else {
            const filteredBooks = booksData.filter((book) => {
                const title = book.book_name.toLowerCase();
                return title.includes(searchTerm.toLowerCase());
            });

            setBooks(filteredBooks);
        }
    };


    const AddBookPage = () => {
        navigation.navigate("Add Book");
        //const currentBookObject = await book;
        handleAddBook();
    }

    return (

        <SafeAreaView style={styles.container}>
                <View style={styles.InputContainer}>
                    <Icon name="search" size={20} color="#888181" style={styles.bookIcon} />
                    <TextInput
                        style={styles.InputTextBox}
                        placeholder={"Search for a book"}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style = {{alignItems:'center', marginTop: 9, marginBottom:5}}>
                    <Text style = {{fontSize:18, fontWeight:'bold', textDecorationLine:'underline'}}>Books for sale</Text>
                </View>

                <StatusBar style="auto" />
                <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                    {
                        books.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("Book Info", { bookInfo: item })}>
                                    <View style={[styles.item, { width: '100%' }]}>

                                        <View style={styles.square}></View>
                                        <Book bookInfo={item} />
                                        <View style={styles.details}>
                                            <Text style={{ textDecorationLine: "underline" }}>More details</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Add Book")}
                        style={styles.roundButton}>
                        <Text style={styles.plus}>Sell a book</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView >
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
    searchContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    text: {
        fontSize: 50,
        color: '#000',
    },
    InputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 370,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#D9FFF6',
        borderRadius: 15,
        // justifyContent: "center" //center vertically
    },

    bookIcon: {
        marginLeft: 15,
        marginRight: 10,
    },
    footerContainer: {
        position: 'relative',
        margin: 10,
        color: '#81F4D8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        color: '#000',
    },
    button: {

        textAlign: 'center'
    },
    roundButton: {
        width: 182,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#81F4D8'
    },
    item: {
        backgroundColor: '#D9FFF6',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        marginTop: 15,
      
    },
    details: {
        position: "absolute",
        bottom: 0,
        right: 10,
        margin: 10,
        color: '#81F4D8'
    },
    search: {

    },
    buttons: {
        color: '#888181',
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
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

});

export default Main;