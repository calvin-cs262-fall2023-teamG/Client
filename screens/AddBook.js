import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'

const AddBook = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>This is the add book page</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingTop: 30,
    }
});

export default AddBook;