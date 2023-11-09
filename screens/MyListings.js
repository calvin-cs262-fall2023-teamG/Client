import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import Book from '../components/Book';
import user_listings_data from '../user_listings_data';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import Animated, {SlideInDown, SlideInUp, SlideInLeft, FadeInLeft, FadeInRight, SlideInRight, BounceInRight, BounceInLeft, FadeInDown, BounceInDown, StretchInX, StretchInY, FadeIn, BounceInUp, ZoomIn, FadeInUp, ZoomOut} from 'react-native-reanimated';
import AppEntranceAnimation from '../components/AppEntranceAnimation';

// get width dimensions of the screen
const { width: screenWidth } = Dimensions.get('window');
const boxWidth = screenWidth * 0.90; // 90% of the screen width



const listing_data = user_listings_data; //Collects a hardcoded json full of book objects

const MyListings = () => {
    const [books, setBooks] = useState([]); //sets the book list to the hardcoded json. It will be turned instead into the library from the database.

    const navigation = useNavigation();
    
    useEffect(() => {
        setBooks(listing_data);
    }, []); // Empty dependency array to run the effect only once

    return (

        <View style={styles.container}>
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {books.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("Edit Listing", { bookInfo: item })}
                >
                    <View style={styles.item}>
                        <View style={styles.square}></View>
                        <Book bookInfo={item} />
                        <View style={styles.details}>
                            <Text style={{ textDecorationLine: "underline", color: '#888181' }}>More details</Text>
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


export default MyListings;
