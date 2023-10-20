import { StatusBar, FlatList } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import books_data from '../books_data';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
            <View>
                <View style={styles.InputContainer}>
                    {/* <Icon name="key" size={20} color="#000" style={styles.icon} /> */}
                    <Icon name="search" size={20} color="#000" style={styles.bookIcon} />

                    <TextInput
                        style={styles.InputTextBox}
                        placeholder={"Search Book"}
                        onChangeText={handleSearch}
                    />
                </View>
                {/*<TextInput style={styles.InputTextBox}>Search bar</TextInput>*/}
                <StatusBar style="auto" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {
                        books.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("Book Info", { bookInfo: item })}>
                                    <Book bookInfo={item} />
                                </TouchableOpacity>

                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style={styles.footerContainer}>
                <Button style={styles.buttons} onPress={()=>navigation.navigate("Add Book")} label="+" />
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
        backgroundColor: '#D9FFF6',
        borderRadius: 15,
        justifyContent: "center" //center vertically
    },
    InputTextBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    bookIcon: {
        marginLeft: 5,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        margin: 20,
        color: '#81F4D8'
    }
});

export default Main;