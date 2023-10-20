import { StatusBar, FlatList } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import InputBox from '../components/InputBox';

const Main = () => {
    const navigation = useNavigation();

    //Temporary constant list of books for proof of concept
    const [book, setBook] = useState();
    const [books, setBooks] = useState([]);

    //The list of books is created like such
    const handleAddBook = () => {
        //Keyboard.dismiss();
        setBooks([...books, book]);
        setBook(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
            <InputBox pHolder='Search Book' icon="search" iconColor='#888181'/>
                
                <StatusBar style="auto" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {
                        books.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("Book Info")}>
                                    <Book text={item} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style={styles.footerContainer}>
                <Button style={styles.buttons} onPress={() => navigation.navigate("Add Book")} label="+" />
                {/* <Button onPress={() => handleAddBook()} label="list" /> */}
            </View>
        </View>
    );
    //Line 41 (Button press handler) needs to go to the add book page, sending in a book object to be edited
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
        width : 400,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: "center", //center vertically
        
    },
   
    bookIcon: {
        marginLeft:5,
    },
    footerContainer: {
        position: 'absolute',
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
});

export default Main;