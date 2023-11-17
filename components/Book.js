/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Book(props) {
  const {
    title, price,
  } = props.bookInfo;
  // Parameters of the Book object are held here (props)

  return (
    <View style={styles.bookcontainer}>
      <Text style={styles.bookname} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <Text style={styles.price}>
        $
        {price}
      </Text>
    </View>
  );
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
