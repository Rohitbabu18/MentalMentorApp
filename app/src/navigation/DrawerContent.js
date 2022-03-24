import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../consts/color";

const DrawerContent = ({ props, navigation }) => {
  const [user_id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const getUserFromStorage = async () => {
    try {
      // setQuotes(AsyncStorage.getItem("quote_id"));
      // console.log("quotes_id ->", quotes);

      await AsyncStorage.getItem("id", (err, value) => {
        if (err) {
        } else {
          if (value !== null) {
            setId(value);
            console.log("id ->", value);
          }
        }
      });

      await AsyncStorage.getItem("name", (err, value) => {
        if (err) {
        } else {
          if (value !== null) {
            setName(() => value);

            console.log("quotes_name ->", value);
          }
        }
      });
      await AsyncStorage.getItem("email", (err, value) => {
        if (err) {
        } else {
          if (value !== null) {
            setEmail(value);

            console.log("quotes_email ->", value);
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  //AsyncStorage.getItem("quote_id"),
  // const get = () => {
  //   const url = "https://infocentroid.us/mental-mentor/api/get_profile";

  //   const params = new FormData();
  //   params.append("user_id", user_id);

  //   // if(checked){
  //   //   params.append("name_visible_status","1")
  //   // }else {
  //   //   params.append("name_visible_status","0")
  //   // }

  //   setTimeout(() => {
  //     console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
  //     fetch(url, {
  //       method: "GET",
  //       body: params,
  //       redirect: "follow",
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result.data);
  //         if (result.response === true) {

  //           navigation.navigate("Drawer");
  //         }
  //         // console.log("api result -> ", result);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, 2000);
  // };
  useEffect(() => {
    const reLoad = navigation.addListener('focus', () => {
      getUserFromStorage();
    });

    return reLoad;
  }, [navigation]);
  return (
    <View style={{ backgroundColor: COLORS.bluelight, height: 200, borderBottomRightRadius: 40 }}>
      <View style={{ alignItems: "center", marginTop: 45 }}>
        <StatusBar backgroundColor={COLORS.bluelight} barStyle={'light-content'} />
        <TouchableOpacity onPress={() => {
          navigation.toggleDrawer();
          navigation.navigate("Profile");
        }}>
          <Image
            source={require('../../../assets/Profile.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
              marginStart: 15,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginStart: 5, color: COLORS.white, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontSize: 16, marginStart: 5, marginTop: 10, color: COLORS.white }}>
          {email}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          height: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginStart: 10,
          marginTop: 30,
        }}
        onPress={() => {
          navigation.toggleDrawer();
          navigation.navigate("Drawer");
        }}
      >
        <FontAwesome name="home" size={24} color={COLORS.bluelight} />

        <Text
          style={{
            fontSize: 16,
            color: "black",
            marginStart: 10,
            marginLeft: 20,
          }}
        >
          Home
        </Text>
      </TouchableOpacity>

      <View
        style={{
          height: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginStart: 10,
        }}
      >
        {/* <AntDesign name="plus" size={24} color="black" /> */}
        <MaterialIcons name="post-add" size={24} color="black" />
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
            navigation.navigate("AddPost");
          }}
        >
          <Text
            // onPress={() => navigation.navigate("AddPost")}
            style={{
              fontSize: 16,
              color: "black",
              marginStart: 10,
              marginLeft: 20,
            }}
          >
            AddPost
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginStart: 10,
        }}
      >
        <Ionicons name="search" size={24} color="black" />
        <TouchableOpacity
          onPress={() => {
            // navigation.toggleDrawer();
            try {
              navigation.toggleDrawer();
              navigation.navigate("Search");
            } catch (error) {
              console.log(
                "Error in navigating to search screen -> ",
                JSON.stringify(error)
              );
            }
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              marginStart: 10,
              marginLeft: 20,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginStart: 10,
        }}
      >
        <MaterialCommunityIcons name="account-tie" size={24} color="black" />
        {/* <MaterialCommunityIcons name="face-profile" size={24} color="black" /> */}
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
            navigation.navigate("Profile");
          }}
        >
          <Text
            // onPress={() => navigation.navigate("AddPost")}
            style={{
              fontSize: 16,
              color: "black",
              marginStart: 10,
              marginLeft: 20,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginStart: 10,
        }}
      >

        <MaterialCommunityIcons name="logout" size={24} color="black" style={{ marginLeft: 2 }} />

        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            navigation.toggleDrawer();
            navigation.replace("SignIn");
          }}
        >
          <Text
            //  onPress={() => {
            //     AsyncStorage.clear();
            //     navigation.navigate("SignIn");
            //   }}

            style={{
              fontSize: 16,
              color: "black",
              marginStart: 10,
              marginLeft: 20,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
  },
});
