import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from './components/Button';
import React, { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]); // Initialize an empty array to store items

  const addItemHandler = () => {
    // This function will be called when the "+" button is pressed
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]); // Add the new item to the items array
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChapterCache</Text>
      <StatusBar style="auto" />

      <View style={styles.footerContainer}>
        <Button label="+" onPress={addItemHandler} />
      </View>
      <ScrollView style={styles.listContainer}>
          {items.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              {item}
            </Text>
          ))}
        </ScrollView>
    </View>
	

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'top',

    marginTop: 50,
  },

  text: {
    fontSize: 50,
    color: '#000',
  },
  listContainer: {
    flex: 1, // Make the list container take up available space
    width: '100%', // Make the list take up the entire width
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'right',
    borderColor: 'black',
    backgroundColor: 'white',

	  alignItems: 'right',
	  borderColor: 'black',
	  backgroundColor: 'white',

  }
});
