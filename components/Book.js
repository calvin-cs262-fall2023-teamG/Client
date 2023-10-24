import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Book = (props) => {
  const { book_name, isbn, author, course_name, price, seller_name, seller_email } = props.bookInfo;

  return (
    <View>
      <Text style={styles.bookname} numberOfLines={1} ellipsizeMode="tail">{book_name}</Text>
      <Text>${price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bookname: {
    fontWeight: 'bold',
    fontSize: 18,
    maxWidth: 320,
  },

});

export default Book;
