import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screens/Main";
import AddBook from "./screens/AddBook";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: "Chapter Cache",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: "#F06E1D"},
            headerTintColor: "white"
            
        }}>
            <Stack.Group>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Add Book" component={AddBook} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default StackNavigator;