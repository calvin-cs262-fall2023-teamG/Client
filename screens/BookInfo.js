//Holds information about the book
import React from 'react'
import { StyleSheet, View, Text, SafeAreaView,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

const BookInfo = ({route}) => {
    const { bookInfo } = route.params; //The elements to be held come from the book you accessed to get here
    return (
        <SafeAreaView style={styles.container}>
            {/* The format for storing book data */}
            <View>
                <InfoView name ="Book" icon="book" value={bookInfo.book_name}/>
                <InfoView name ="ISBN" icon = "hashtag" value={bookInfo.isbn}/>
                <InfoView name ="Author" icon = "user" value={bookInfo.author}/>
                <InfoView name ="Course Name" icon = "graduation-cap" value={bookInfo.course_name}/>
                <InfoView name ="Price" icon = "tags" value= {`$${bookInfo.price}`}/>
                <InfoView name ="Seller Name" icon="user" value={bookInfo.seller_name}/>
                <InfoView name ="Seller Email" icon = "envelope" value={bookInfo.seller_email}/>
            </View>
        </SafeAreaView>
    )
}

//Displays information regarding the book
const InfoView = ({name, value, icon})=>{
    return(
        <View style={styles.info}>
            <Icon name={icon} size={20} color="#888181" style={styles.icon} />
            <View>
                <Text style={{fontWeight: 'bold', color: "#888181"}}>{name}</Text>
                <Text style={{maxWidth:310, color: "#888181"}}>{value}</Text>
            </View>
        </View>
    )
}

//Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    content: {
        flex: 1
    },
    info:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor : '#D9FFF6',
        height: '15%',
        borderColor: '#000',
        borderBottomWidth: 1,
    },
    icon:{
        marginRight:10
    }

});

export default BookInfo;