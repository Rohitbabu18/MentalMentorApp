import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./app/src/views/screen/SplashScreen";
import SignInScreen from "./app/src/views/screen/SignInScreen";
import SignUpScreen from "./app/src/views/screen/SignUpScreen";
import HomeScreen from "./app/src/views/screen/HomeScreen";
import CommentScreen from "./app/src/views/screen/CommentScreen";
import AddPostScreen from "./app/src/views/screen/AddPostScreen";
import SearchScreen from "./app/src/views/screen/SearchScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNav from "./app/src/navigation/DrawerNav";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ header: () => null }}>*/}

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Drawer" component={DrawerNav} />

        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="Comment" component={CommentScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
