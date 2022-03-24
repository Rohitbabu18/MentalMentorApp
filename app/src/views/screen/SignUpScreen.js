import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import Styles from "../../styles";
import axios from "axios";
import Loader from "../utils/Loader";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(name,email,password);

  function SignUp() {
    if (name === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please enter full name",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else if (email === "") {
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
      const url = "https://infocentroid.us/mental-mentor/api/registration?name";

      const params = new FormData();
      params.append("name", name);
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
              navigation.navigate("SignIn");
              setLoading(false);
            }
            else {
              Platform.OS === "android"
                ? ToastAndroid.showWithGravity(
                  "Email already exist...",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                ) : null
            }

            console.log("api result -> ", result);
          })
          .catch((error) => console.log("error", error))
          .finally(() => {
            setLoading(false);
          });
      }, 1000);
    }
  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 22, color: COLORS.dark }}
          >
            Mentor{" "}
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

        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: COLORS.secondary,
            }}
          >
            Welcome MentalMentor App Application
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.primary,
              marginTop: 10,
            }}
          >
            Sign Up to continue
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
            source={require("../../../../assets/user.png")}
          />

          <TextInput
            placeholder="Full Name"
            onChangeText={(e) => {
              setName(e);
            }}
            keyboardType="default"
            style={{
              paddingLeft: 15,
              flex: 1,
              fontSize: 16,
              height: 45,
            }}
          />
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
            source={require("../../../../assets/padlock.png")}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(e) => {
              setPassword(e);
            }}
            keyboardType="visible-password"
            secureTextEntry={true}
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
            SignUp();
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
              Sign Up
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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={Styles.btnsecondary}>
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
            Already have an account ?{" "}
          </Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontWeight: "bold", color: COLORS.pink }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignUpScreen;
