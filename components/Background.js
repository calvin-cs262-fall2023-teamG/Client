import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
const { height: screenHeight } = Dimensions.get('window');

const Background = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shapesContainer}>
        <View style={styles.shape1} />
        <View style={styles.shape2} />
        <View style={styles.shape3} />
        <View style={styles.shape4} />
        <View style={styles.shape5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shapesContainer: {
        position: 'absolute',
        flexWrap: 'wrap',
    },
    shape1: {
        position: "absolute",
        top: -90,
        left: -80,
        width: 190,
        height: 190,
        borderRadius: 90,
        backgroundColor: "#8CFFD6",
        opacity: 0.5,
      },
      shape2: {
        position: 'absolute',
        width: 200,
        height: 200,
        left: 40,
        borderRadius: 100,
        backgroundColor: '#A1FFB6',
        transform: [{ translateY: screenHeight - 110}],
      },
      shape3: {
        position: 'absolute',
        width: 200,
        height: 200,
        left: -90,
        borderRadius: 100,
        backgroundColor: '#8CFFD6',
        transform: [{ translateY: screenHeight - 200}],
      },
      shape4: {
        position: "absolute",
        width: 260,
        height: 120,
        left: 210,
        borderRadius: 70,
        backgroundColor: "#8CFFD6",
        transform: [{ rotate: "50deg" }],
      },
      shape5: {
        position: "absolute",
        width: 280,
        height: 140,
        left: 280,
        borderRadius: 40,
        backgroundColor: "#B4F7C3",
        transform: [{ rotate: "70deg" }],
      },

   
});

export default Background;
