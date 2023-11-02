import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions } from 'react-native'
import Background from '../components/Background';

// get height dimensions of the screen 


const AddBookHelp = ({  }) => {
    

    

    return (
        <View>
            <Background></Background>
            <TextFunc textTitle={'Book name:'} textBody={'The title of the book.'}/>
            <TextFunc textTitle={'ISBN #:'} textBody={'ISBN is a book\'s unique id number usually found on the back cover of a book above the bar code on the copyright page.'}/>
            <TextFunc textTitle={'Author:'} textBody={'Enter the writer of the book.'}/>
            <TextFunc textTitle={'Course name:'} textBody={'The name of the course that this book was used for.'}/>
            <TextFunc textTitle={'Price:'} textBody={<Text>The price that <Text style={{textDecorationLine: 'underline'}}>you</Text> would like to sell your book for.</Text>} />
            <TextFunc textTitle={'Front & back pictures:'} textBody={'A picture of the front and back cover of your book.'}/>
      </View>
    )
}

const TextFunc=({textTitle, textBody})=>{
  return(
    <Text style = {styles.text}>
      <Text style={{ fontWeight: 'bold' }}>{textTitle}</Text>{textBody}
    </Text>
  )
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        fontSize: 15
    }
});


export default AddBookHelp;
