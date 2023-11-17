import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import Modal from 'react-native-modal';
import sendEmail from '../components/sendEmail';
import Animated, { SlideInDown, SlideInUp, SlideInLeft, FadeInLeft, FadeInRight, SlideInRight, BounceInRight, BounceInLeft, FadeInDown, BounceInDown, StretchInX, StretchInY, FadeIn, BounceInUp, ZoomIn, FadeInUp, ZoomOut } from 'react-native-reanimated';
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


const BookInfo = ({ route }) => {

    const { bookInfo } = route.params;
    const handleContactSeller = () => {
        // Pass the necessary data to the sendEmail function
        sendEmail(bookInfo.title, bookInfo.emailaddress, bookInfo.name);
      };

    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
                <InfoView name="Book" icon="book" value={bookInfo.title} />
                <InfoView name="ISBN" icon="hashtag" value={bookInfo.isbn} />
                <InfoView name="Author" icon="user" value={bookInfo.author} />
                <InfoView name="Course Name" icon="graduation-cap" value={bookInfo.coursename} />
                <InfoView name="Price" icon="tags" value={`$${bookInfo.price}`} />
                <InfoView name="Seller Name" icon="user" value={bookInfo.name} />
                <InfoView name="Seller Email" icon="envelope" value={bookInfo.emailaddress} />
                
                <View style = {styles.imageContainer}>
                    <View style = {styles.imageSection}>
                        <Text style={styles.text}>Front Picture</Text>
                        <Image source = {PlaceholderImageFront} style = {styles.image} />   
                    </View>

                    <View style = {styles.imageSection}>
                        <Text style={styles.text}>Back Picture</Text>
                        <Image source = {PlaceholderImageBack} style = {styles.image} />   
                    </View>
                </View>

                <View style={styles.button}>
                    <Button style="small button" label="Contact Seller" onPress={handleContactSeller}/>
                    
                    {/*This is a bug to fix a bug DON'T TOUCH */}
                    <Modal>
                        <Animated.View style={styles.modalContainer} entering={ZoomIn.duration(500)}>
                            <Text paddingHorizontal={10}>Enter New Email:</Text>
                            <InputBox pHolder="New Email" icon="envelope" /> 
                        </Animated.View>
                    </Modal>
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
    },
});

export default BookInfo;
