import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const BookInfo = ({ route }) => {
    const { bookInfo } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <InfoView name="Book" icon="book" value={bookInfo.title} />
                <InfoView name="ISBN" icon="hashtag" value={bookInfo.isbn} />
                <InfoView name="Author" icon="user" value={bookInfo.author} />
                <InfoView name="Course Name" icon="graduation-cap" value={bookInfo.course_name} />
                <InfoView name="Price" icon="tags" value={`$${bookInfo.price}`} />
                <InfoView name="Seller Name" icon="user" value={bookInfo.seller_name} />
                <InfoView name="Seller Email" icon="envelope" value={bookInfo.seller_email} />
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
    }
});

export default BookInfo;
