import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from '../components/Book';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Background from '../components/Background';

// get height dimensions of the screen 


const AddBookHelp = ({  }) => {
    

    

    return (
        <View>
            <Background></Background>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Book name: </Text>The title of the book.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>ISBN #: </Text>ISBN is a book's unique id number usually found on the back cover of a book above the bar code on the copyright page.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Author: </Text>Enter the writer of the book.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Course name: </Text>The name of the course that this book was used for.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>The price that <Text style={{textDecorationLine: 'underline'}}>you</Text> would like to sell your book for.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Front & back pictures: </Text>A picture of the front and back cover of your book.
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        fontSize: 15
    }
});


export default AddBookHelp;
