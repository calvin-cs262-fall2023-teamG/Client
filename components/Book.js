import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Book = (props) => {
  const { book_name, isbn, author, course_name, price, seller_name, seller_email } = props.bookInfo;

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <View>
          <Text style={styles.itemText}>{book_name}</Text>
          <Text>Author: {author}</Text>
          <Text>ISBN: {isbn}</Text>
        </View>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#00DDDD',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'yellow',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Book;
