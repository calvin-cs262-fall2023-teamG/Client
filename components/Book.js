import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Book = (props) => {
  const { title, isbn, author, coursename, price, seller_name, seller_email } = props.bookInfo;
  //Parameters of the Book object are held here (props)

  return (
    <View>
      <Text style={styles.bookname} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
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

});

export default Book;
