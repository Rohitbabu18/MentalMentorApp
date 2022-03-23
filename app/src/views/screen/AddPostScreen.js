import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  StatusBar,
  Platform,
  ToastAndroid,
} from "react-native";
// import { Component } from "react/cjs/react.production.min";
import COLORS from "../../consts/color";
import SelectDropdown from "react-native-select-dropdown";
import { EvilIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from "react-native-elements";
import Styles from "../../styles";
import Loader from "../utils/Loader";
// Import statement for image picker
import * as ImagePicker from "expo-image-picker";

// class AddPostScreen extends Component{
//   state={user:''}
//   updateUser =(user)=>{
//     this.setState({user:user})
//   }
// }

function AddPostScreen({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [user_id, setUser_id] = useState("");
  const [creator_name, setCreator_name] = useState("");
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const dropdownData = [
    "Education",
    "Profession",
    "Social",
    "Medical",
    "Financial",
    "Sports",
    "Family",
    "Personal",
    "Sexual",
    "Lifestyle",
    "Injustice",
    "Other",
  ];

  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [show, setShow] = useState(false);
  const [Dontshow, setDontshow] = useState(false);

  const checkedshow = () => {
    setShow(true);
    setDontshow(false);
  };

  const checkeddontshow = () => {
    setShow(false);
    setDontshow(true);
  };

  // console.log(email, password);
  var status;

  const Post = () => {
    if (query === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please enter your question",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else if (selectedItem === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please select topic",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else if (imageSource === "") {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
          "Please select image",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        : null;
    } else {
      setLoading(true);
      const url = "https://infocentroid.us/mental-mentor/api/add_post";

      const params = new FormData();
      params.append("user_id", "1");
      params.append("creator_name", "abcd");
      params.append("topic", selectedItem);
      params.append("query", query);
      if (imageSource) {
        params.append("image", {
          uri: imageSource,
          name: imageSource,
          type: "image/jpeg",
        });
      } else {
        params.append("image", "");
      }
      if (show) {
        params.append("name_visible_status", "1");
      } else if (Dontshow) {
        params.append("name_visible_status", "0");
      }

      // setTimeout(() => {
      console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
      fetch(url, {
        method: "POST",
        body: params,
        redirect: "follow",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("api result -> ", result.response);
          navigation.replace("Drawer");
          if (result.response === true) {
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setLoading(false);
        });
      // }, 1000);
    }
  };

  {
    /*useEffect(() => {
 
    console.log("user_id  ");
   
  }, []);

  const get = (id) => {
    const url = "https://infocentroid.us/mental-mentor/api/get_profile";

    const params = new FormData();
    params.append("user_id", id);

    setTimeout(() => {
      console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
      fetch(url, {
        method: "POST",
        body: params,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.response === true) {
            console.log("api result -> ", result.data);
            setCommentData(result.data);
          }
        })
        .catch((error) => console.log("error", error));
    }, 2000);
  };

  
*/
  }

  const pickImageFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    setImageSource(pickerResult.uri);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.whitelight,
        flex: 1,
      }}
    >

      <StatusBar backgroundColor={COLORS.bluelight} barStyle='light-content' />
      <Loader loading={loading} />
      <View
        style={{
          height: 80,
          width: "100%",

          alignItems: "center",
          backgroundColor: COLORS.bluelight,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginStart: 20,
            color: COLORS.white
          }}
        >
          Ask a question here
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            borderWidth: 0.7,
            borderRadius: 10,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <TextInput
            placeholder="Enter your question"
            onChangeText={(e) => {
              setQuery(e);
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

        <SelectDropdown
          data={dropdownData}
          onSelect={(selectedItem, index) => {
            setSelectedItem(selectedItem);
          }}
          buttonStyle={{
            borderRadius: 10,
            borderWidth: 0.7,
            borderColor: COLORS.dark,
            width: "90%",
            marginTop: 15,
            marginBottom: 15,
            alignSelf: "center",
          }}
          defaultButtonText="Topic..."
          buttonTextStyle={{
            textAlign: "left",
            fontSize: 16,
          }}
          dropdownIconPosition="right"
          renderDropdownIcon={() => {
            return (
              <View>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/57/57055.png",
                  }}
                  style={{
                    height: 10,
                    width: 10,
                    marginEnd: 10,
                  }}
                />
              </View>
            );
          }}
        />

        {/*<View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <TextInput
            placeholder="Enter your name"
            onChangeText={(e) => {
              setCreator_name(e);
            }}
            keyboardType="default"
            style={{
              paddingLeft: 15,
              flex: 1,
              fontSize: 16,
              height: 45,
            }}
          />

          </View>*/}
        <View
          style={{
            marginTop: 15,
            width: "auto",
          }}
        >
          <CheckBox
            // title="Show My Name"
            // checked={checked}
            title="Show Your Name"
            checked={show}
            //checked={checked}
            checkedIcon="dot-circle-o"
            checkedColor={COLORS.bluelight}
            uncheckedIcon="circle-o"
            // onPress={() => {
            //   setChecked(!checkedshow);

            // }}
            onPress={checkedshow}
          />

          <CheckBox
            // title="Show My Name"
            // checked={checked}
            title="dont Show Your Name"
            checked={Dontshow}
            //checked={checked}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            // onPress={() => {
            //   setChecked(!checkeddontshow);

            // }}
            onPress={checkeddontshow}
          />
        </View>
        {/*<Text style={{fontWeight:'bold',color:'red'}}>{checked?"Yes":"No"}</Text>*/}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          pickImageFromGallery();
        }}
      >
        <Image
          source={{
            uri:
              imageSource ||
              "https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg",
          }}
          style={{
            height: 80,
            width: 90,
            borderRadius: 10,
            marginBottom: 20,
            marginStart: 140,
            marginTop: 20,
            // tintColor: "#ffa07a",
          }}
        />
        {/*<Text>Upload an Image</Text>*/}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={[Styles.btnsecondary, { backgroundColor: COLORS.bluelight }]}
        >
          <Text style={{ fontSize: 18, color: COLORS.white }}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ width: 10 }}></View>

        <TouchableOpacity
          style={[Styles.btnsecondary, { backgroundColor: COLORS.bluelight }]}
          activeOpacity={0.8}
          onPress={() => {
            Post();
          }}
        >
          <Text style={{ fontSize: 18, color: COLORS.white }}>Post</Text>
        </TouchableOpacity>
      </View>

      {/*<TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          Post();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "40%",
          }}
        >
          <View style={styles.btnsecondary}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Post</Text>
          </View>
        </View>
        </TouchableOpacity>*/}

    </View>
  );
}
export default AddPostScreen;

const styles = StyleSheet.create({
  inputContainer: {
    // flexDirection: "row",

    margin: 10,
  },

  input: {
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    height: 40,
    padding: 20,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  btnsecondary: {
    height: 40,
    //
    // borderColor: COLORS.light,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // borderWidth: 1,
    // flexDirection: "row",
    // marginLeft: 80,
    // marginBottom:20,
    // width:'20%',
    // flex:1,
    // borderWidth: 1,
    // borderRadius:5

    width: 120,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,

    borderWidth: 1,
    marginRight: 30,
  },
  btn: {
    width: 120,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 15,

    borderWidth: 1,
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 10,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
