import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../consts/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../../styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../utils/Loader";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(email, password);

  function login() {
    if (email === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please enter your email address",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else if (password === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please enter your password",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else {
      const url = "https://infocentroid.us/mental-mentor/api/login";

      const params = new FormData();
      params.append("email", email);
      params.append("password", password);
      setLoading(true);
      setTimeout(() => {
        // console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
        fetch(url, {
          method: "POST",
          body: params,
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.response === true) {
              // console.log("json login data", JSON.stringify(result.data.id));
              // console.log("json login data", JSON.stringify(result.data.email));
              // console.log("json login data", JSON.stringify(result.data.name));
              AsyncStorage.setItem("id", result.data.id);
              AsyncStorage.setItem("name", result.data.name);
              AsyncStorage.setItem("email", result.data.email);
              AsyncStorage.setItem("password", result.data.password);
              navigation.replace("Drawer");
            }
            // console.log("api result -> ", result);
          })
          .catch((error) => console.log("error", error))
          .finally(() => {
            setLoading(false);
            setLoading.bind(undefined, false);
          });
      }, 1000);
    }
  }
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: COLORS.dark }}
          >
            MentalMentor{" "}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: COLORS.secondary,
            }}
          >
            App
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: COLORS.secondary,
            }}
          >
            {/* Welcome back to page*/}
            Welcome to Mental Mentor App Application
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.primary,
              marginTop: 10,
            }}
          >
            Sign In to continue
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              alignSelf: "center",
              marginStart: 15,
            }}
            source={require("../../../../assets/mail.png")}
          />

          <TextInput
            placeholder="Email ID"
            onChangeText={(e) => {
              setEmail(e);
            }}
            keyboardType="email-address"
            style={{
              paddingLeft: 15,
              flex: 1,
              fontSize: 16,
              height: 45,
            }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                marginStart: 15,
              }}
              source={require("../../../../assets/padlock.png")}
            />

            <TextInput
              placeholder="Password"
              onChangeText={(e) => {
                setPassword(e);
              }}
              secureTextEntry={true}
              keyboardType="visible-password"
              style={{
                paddingLeft: 15,
                flex: 1,
                fontSize: 16,
                height: 45,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              login();
              // navigation.openDrawer()
            }}
          >
            <View style={Styles.btnPrimary}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Sign In
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={Styles.line}></View>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 5 }}
            >
              OR
            </Text>
            <View style={Styles.line}></View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={Styles.btnsecondary}
              onPress={() => { }}
            >
              <Image
                style={Styles.btnImage}
                source={{
                  uri: "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg",
                }}
              />
              <Text style={{ fontSize: 16 }}>Google</Text>
            </TouchableOpacity>

            <View style={{ width: 10 }}></View>

            <TouchableOpacity style={Styles.btnsecondary}>
              <Image
                style={Styles.btnImage}
                source={{
                  uri: "https://png.pngtree.com/png-clipart/20180515/ourmid/pngtree-facebook-icon-facebook-logo-png-image_3566129.png",
                }}
              />
              <Text style={{ fontSize: 16 }}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.light }}>
            Don't have an account ?{" "}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: "bold", color: COLORS.pink }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignInScreen;
