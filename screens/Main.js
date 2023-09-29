import { StatusBar, FlatList } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const Main = () => {
    const navigation = useNavigation();

    //Temporary constant list of books for proof of concept
    const [book, setBook] = useState();
    const [books, setBooks] = useState([]);

    //Temporarily adding this to make a test cases
    const handleAddBook = () => {
        //Keyboard.dismiss();
        setBooks([...books, book]);
        setBook(null);
      }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <StatusBar style="auto" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
             {
              books.map((item, index) => {
              return (
                    <TouchableOpacity key={index}  onPress={() => navigation.navigate("Book Info")}>
                        <Book text={item} /> 
                    </TouchableOpacity>
                )
              })
             }
            </ScrollView>
            </View>
            
            <View style={styles.footerContainer}>
                <Button onPress={() => navigation.navigate("Add Book")} label="+" /> 
                <Button onPress={() => handleAddBook()} label="LIST ADDER" />
            </View>
        </SafeAreaView>
    );
    //Line 38 (Button press handler) needs to go to the add book page, sending in a book objec to be edited
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

    footerContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        margin: 20,
    }
});

export default Main;