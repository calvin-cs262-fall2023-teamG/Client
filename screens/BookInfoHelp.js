import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import Background from '../components/Background';

// get height dimensions of the screen

function BookInfoHelp() {
  return (
    <Animated.View entering={FadeInUp.duration(500)}>
      <Background />
      <TextFunc textTitle="Book name: " textBody="The title of this book." />
      <TextFunc textTitle="ISBN #: " textBody={'ISBN is a book\'s unique id number usually found on the back cover of a book above the bar code on the copyright page.'} />
      <TextFunc textTitle="Author: " textBody="The writer of this book." />
      <TextFunc textTitle="Course name: " textBody="The name of the course that this book was used for." />
      <TextFunc textTitle="Price: " textBody="The price that this book is being sold for." />
      <TextFunc textTitle="Seller name: " textBody="The name of the person selling this book." />
      <TextFunc textTitle="Seller Email: " textBody="The email of the person selling this book. Use this to contact the person." />
    </Animated.View>
  );
}

function TextFunc({ textTitle, textBody }) {
  return (
    <Text style={styles.text}>
      <Text style={{ fontWeight: 'bold' }}>{textTitle}</Text>
      {textBody}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    fontSize: 15,
  },
});

export default BookInfoHelp;
