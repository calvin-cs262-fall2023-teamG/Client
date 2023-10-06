import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <StatusBar style="auto" />
            </View>
            <View style={styles.footerContainer}>
                <Button onPress={() => navigation.navigate("Add Book")} label="+" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 50,
        color: '#000',
    },

    footerContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        margin: 20,
    }
});

export default Main;