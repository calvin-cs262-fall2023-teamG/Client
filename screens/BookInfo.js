//Holds information about the book
import React from 'react'
import { StyleSheet, View, Text, SafeAreaView,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

const BookInfo = ({route}) => {
    const { bookInfo } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <InfoView name ="Book" icon="book" value={bookInfo.book_name}/>
                <InfoView name ="ISBN" icon = "hashtag" value={bookInfo.isbn}/>
                <InfoView name ="Author" icon = "user" value={bookInfo.author}/>
                <InfoView name ="Course Name" icon = "graduation-cap" value={bookInfo.course_name}/>
                <InfoView name ="Price" icon = "tags" value={bookInfo.price}/>
                <InfoView name ="Seller Name" icon="user" value={bookInfo.seller_name}/>
                <InfoView name ="Seller Email" icon = "envelope" value={bookInfo.seller_email}/>
            </View>
        </SafeAreaView>
    )
}
const InfoView = ({name, value, icon})=>{
    return(
        <View style={styles.info}>
            <Icon name={icon} size={20} color="#000" style={styles.icon} />
            <View>
                <Text style={{fontWeight: 'bold'}}>{name}</Text>
                <Text style={{maxWidth:310}}>{value}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    info:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        backgroundColor : '#D9FFF6',
        marginBottom: 15,
        borderRadius: 15,
    },
    icon:{
        marginRight:10
    }

});

export default BookInfo;