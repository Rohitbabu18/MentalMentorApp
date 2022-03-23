import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SignInScreen from "../views/screen/SignInScreen";
import HomeScreen from "../views/screen/HomeScreen";
import AddPostScreen from "../views/screen/AddPostScreen";
import SearchScreen from "../views/screen/SearchScreen";
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}> 

  {/*<Stack.Screen name="SignIn" component={SignInScreen} />*/}
    <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="AddPost" component={AddPostScreen} />
  <Stack.Screen name="Search" component={SearchScreen} />
  
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
