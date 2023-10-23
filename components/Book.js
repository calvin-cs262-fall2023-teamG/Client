import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Book = (props) => {
  const { book_name, isbn, author, course_name, price, seller_name, seller_email } = props.bookInfo;

  return (
    <View style={styles.info}>
      <Text style={styles.bookname} numberOfLines={1} ellipsizeMode="tail">{book_name}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bookname: {
    fontWeight: 'bold',
    fontSize: 17,
    maxWidth: 320,
  },
  item: {
    backgroundColor: '#D9FFF6',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 15,
  },
  info: {
  },

  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  price: {
    marginTop: 5,
    fontStyle: 'italic',
  }

});

export default Book;
