import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions } from 'react-native'
import Background from '../components/Background';
import Animated, {SlideInDown, SlideInUp, SlideInLeft, FadeInLeft, FadeInRight, SlideInRight, BounceInRight, BounceInLeft, FadeInDown, BounceInDown, StretchInX, StretchInY, FadeIn, BounceInUp, ZoomIn, FadeInUp, FlipInYLeft, FlipInYRight, RollInRight, RollInLeft, ZoomInEasyUp, LightSpeedInLeft} from 'react-native-reanimated';

// get height dimensions of the screen 


const AddBookHelp = ({  }) => {
    

    

    return (
        <Animated.View entering={FadeInUp.duration(500)}>
            <Background></Background>
            <TextFunc textTitle={'Book name: '} textBody={'The title of the book.'}/>
            <TextFunc textTitle={'ISBN #: '} textBody={'ISBN is a book\'s unique id number usually found on the back cover of a book above the bar code on the copyright page.'}/>
            <TextFunc textTitle={'Author: '} textBody={'Enter the writer of the book.'}/>
            <TextFunc textTitle={'Course name: '} textBody={'The name of the course that this book was used for.'}/>
            <TextFunc textTitle={'Price: '} textBody={<Text>The price that <Text style={{textDecorationLine: 'underline'}}>you</Text> would like to sell your book for.</Text>} />
            <TextFunc textTitle={'Front & back pictures: '} textBody={'A picture of the front and back cover of your book.'}/>
      </Animated.View>
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
