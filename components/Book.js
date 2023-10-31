import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Book = (props) => {
  const { book_name, isbn, author, course_name, price, seller_name, seller_email } = props.bookInfo;

  return (
    <View style={styles.bookcontainer}>
      <Text style={styles.bookname} numberOfLines={1} ellipsizeMode="tail">{book_name}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bookcontainer: {
    maxWidth: '87%',
  },
  bookname: {
    fontWeight: 'bold',
    fontSize: 17,
  },

});

export default Book;
