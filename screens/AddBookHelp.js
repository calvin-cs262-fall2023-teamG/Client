import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import Background from '../components/Background';

function AddBookHelp() {
  return (
    <Animated.View entering={FadeInUp.duration(500)}>
      <Background />
      <HeaderFunc textTitle="This page provides explanation about each input field." />
      <TextFunc textTitle="Book name: " textBody="The title of the book." />
      <TextFunc textTitle="ISBN #: " textBody="The book's 13-digit unique id number found above the bar code." />
      <TextFunc textTitle="Author: " textBody="The writer of the book." />
      <TextFunc textTitle="Course name: " textBody="The name of the course that utilizes the book." />
      <TextFunc textTitle="Price: " textBody="The price you would like to sell the book." />
      <TextFunc textTitle="Condition: " textBody="The condition of the book." />
      <TextFunc textTitle="Front & back pictures: " textBody="A picture of the front and back cover of the book." />
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

function HeaderFunc({ textTitle }) {
  return (
    <Text style={styles.header}>
      <Text style={{ fontWeight: 'bold' }}>{textTitle}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    fontSize: 19,
  },
  header: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 40,
    marginBottom: 30,
    fontSize: 19,
  },
});

export default AddBookHelp;
