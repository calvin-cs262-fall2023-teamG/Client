import { StatusBar, FlatList } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import books_data from '../books_data';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import InputBox from '../components/InputBox';

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
            <View style={styles.searchContainer}>

             <InputBox pHolder='Search Book' icon="search" iconColor='#888181'/>

                <StatusBar style="auto" />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:70 }}>
                    {
                        books.map((item, index) => {
                            return (
                                <View style={styles.item}>

                                    <View style={styles.square}></View>
                                    <Book bookInfo={item} />
                                    <View style={styles.details}>
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate("Book Info", { bookInfo: item })}>
                                            <Text>More details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Add Book")}
                        style={styles.roundButton}>
                        <Text style={styles.plus}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
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
        width: 400,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: "center", //center vertically
        
    },
   
    bookIcon: {
        marginLeft: 5,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        margin: 10,
        color: '#81F4D8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        fontSize: 30,
        color: '#000',
    },
    button: {

        textAlign: 'center'
    },
    roundButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#81F4D8',
        borderColor: '#000000',
        borderWidth: 2,
    },
    item: {
        backgroundColor: '#81F4D8',
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: 10,
    },
    details: {
        position: "absolute",
        bottom: 10,

        right: 10,
        margin: 20,
        color: '#81F4D8'
    },
    search:{
    
    },
    buttons:{
        color: '#888181',
    }

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: 'red',
        alignItems: "center",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },

});

export default Main;