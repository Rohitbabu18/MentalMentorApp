import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../consts/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getUserFromStorage();
    }, 3000);
  }, []);

  const getUserFromStorage = async () => {
    console.log("I am called");
    try {
      await AsyncStorage.getItem("id", (err, value) => {
        if (err) {
          console.log("Error in getting user from storage if block -> ", err);
          return;
        } else {
          if (value !== null) {
            setUserId(value);
            navigation.replace("Drawer");
          } else {
            navigation.replace("SignIn");
          }
        }
      });
    } catch (error) {
      console.log("Error in getting user from storage -> ", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Image
        style={styles.btnImage}
        source={{
          uri: "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg",
        }}
      /> */}

      <Text
        style={{
          fontWeight: "bold",
          color: COLORS.black,
          fontSize: 18,
          textAlign: "center",
          textAlignVertical: "center",
        }}
      >
        Splash Screen
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  btnImage: {
    width: 20,
    height: 20,
    padding: 10,
  },
});
