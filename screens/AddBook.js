import React from 'react'
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native'

const AddBook = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Title'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='ISBN'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Author'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Course Name'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Cost'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Contact Name'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Contact Email'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Contact Phone'
                    />
                <TextInput 
                    style = {styles.InputTextBox} 
                    placeholder='Pictures'
                    />
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