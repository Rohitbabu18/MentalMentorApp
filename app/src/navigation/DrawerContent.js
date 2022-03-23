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
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../consts/color";

const DrawerContent = ({ props, navigation }) => {
  const [user_id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserFromStorage();
  }, []);
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
            setName(value);

            console.log("quotes_id ->", value);
          }
        }
      });
      await AsyncStorage.getItem("email", (err, value) => {
        if (err) {
        } else {
          if (value !== null) {
            setEmail(value);

            console.log("quotes_id ->", value);
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  //AsyncStorage.getItem("quote_id"),
  const get = () => {
    const url = "https://infocentroid.us/mental-mentor/api/get_profile";

    const params = new FormData();
    params.append("user_id", user_id);

    // if(checked){
    //   params.append("name_visible_status","1")
    // }else {
    //   params.append("name_visible_status","0")
    // }

    setTimeout(() => {
      console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
      fetch(url, {
        method: "GET",
        body: params,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.response === true) {
            navigation.navigate("Drawer");
          }
          // console.log("api result -> ", result);
        })
        .catch((error) => console.log("error", error));
    }, 2000);
  };

  return (
    <View style={{ backgroundColor: COLORS.bluelight, height: 200 }}>
      <View style={{ alignItems: "center", marginTop: 45 }}>
        <StatusBar backgroundColor={COLORS.bluelight} barStyle={'light-content'} />
        <Image
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            marginBottom: 10,
            marginStart: 15,
          }}
        />
        <Text style={{ fontSize: 16, marginStart: 5, color: COLORS.white }}>{name}</Text>
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
        <FontAwesome name="home" size={24} color="#00cc00" />

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
        <AntDesign name="plus" size={24} color="blue" />
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
        <EvilIcons name="search" size={24} color="blue" />
        <TouchableOpacity
          onPress={() => {
            // navigation.toggleDrawer();
            try {
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
        <AntDesign name="logout" size={24} color="black" />

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
