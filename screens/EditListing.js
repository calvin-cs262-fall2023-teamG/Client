import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import sendEmail from '../components/sendEmail';
import InputBox from '../components/InputBox';


const InfoView = ({ name, value, icon }) => {
    const infoWidth = Dimensions.get('window').width * 0.92 ;
    return (
        <View style={[styles.info, { width: infoWidth }]}>
            <Icon name={icon} size={20} color="#888181" style={styles.icon} />
            <View>
                <Text style={{ fontWeight: 'bold', color: "#888181" }}>{name}</Text>
                <Text style={{ color: "#888181" }}>{value}</Text>
            </View>
        </View>
    );
}


// The placeholder images need to be fetched from the database later. 
const PlaceholderImageFront = require('./images/image3.jpg');
const PlaceholderImageBack = require('./images/image2.jpg');


const EditListing = ({ route }) => {
    const { bookInfo } = route.params;

    const title = bookInfo.title;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Book name:</Text>
                <InputBox name="Book" icon="book" value={bookInfo.title} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>ISBN:</Text>
                <InputBox name="ISBN" icon="hashtag" value={bookInfo.isbn} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Author:</Text>
                <InputBox name="Author" icon="user" value={bookInfo.author} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Course name:</Text>
                <InputBox name="Course Name" icon="graduation-cap" value={bookInfo.coursename} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Price:</Text>
                <InputBox name="Price" icon="tags" value={`$${bookInfo.price}`} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Seller name:</Text>
                <InputBox name="Seller Name" icon="user" value={bookInfo.sellername} />
                <Text style={{fontSize: 16, marginLeft: 2, fontWeight: 'bold', marginTop: 15}}>Seller email:</Text>
                <InputBox name="Seller Email" icon="envelope" value={bookInfo.selleremail} />
                
                <View style = {styles.imageContainer}>
                    <View style = {styles.imageSection}>
                        <Text style={styles.text}>Front Picture</Text>
                        <Image source = {PlaceholderImageFront} style = {styles.image} />   
                    </View>

                    <View style = {styles.imageSection}>
                        <Text style={styles.text}>Front Picture</Text>
                        <Image source = {PlaceholderImageBack} style = {styles.image} />   
                    </View>
                </View>

                <View style={styles.button}>
                    <Button style="small button" label="Update" onPress={() => console.log("Update functionality soon to be added.")}/> 
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    info: {
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9FFF6',
        borderRadius: 15,
        justifyContent: 'left',
        paddingHorizontal: 15,
    },

    icon: {
        marginRight: 10
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal: 10,
    },

    imageSection: {
        alignItems: 'center',
    },

    image: {
        width: 150,
        height: 200,
        borderWidth: 4,
        borderColor: 'black',
    },

    text: {
        fontSize: 20,
        marginBottom: 5,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default EditListing;
