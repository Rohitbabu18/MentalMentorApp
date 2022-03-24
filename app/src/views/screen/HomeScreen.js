import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
  Menu,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../utils/Loader";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  // const [cls, setCls] = useState("green");

  const [user_id, setUser_id] = useState("");
  const [post_id, setPost_id] = useState("");
  const [show, setShow] = useState(false);


  const Post = () => {
    const body = {
      user_id: "1",
      post_id: "1",
    };

    const url = "https://infocentroid.us/mental-mentor/api/like_toggle";

    const params = new FormData();
    params.append("user_id", "1");
    params.append("post_id", "1");

    // setTimeout(() => {
    console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
    fetch(url, {
      method: "POST",
      body: params,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response === true) {
          // navigation.navigate("Drawer");
          // setData(result.data);
          // setShow(true);
        }
        console.log("api result -> ", result);
      }) // console.log("api result -> ", result);
      .catch((error) => console.log("error", error));
    // }, 2000);
  };

  const like = (id) => {
    const url = "https://infocentroid.us/mental-mentor/api/like_toggle";
    const params = new FormData();
    params.append("user_id", "1");
    params.append("post_id", id);

    // setTimeout(() => {
    console.log(
      "like api url  -> ",
      url + "  >>body -> " + JSON.stringify(params)
    );
    fetch(url, {
      method: "POST",
      body: params,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response === true) {
          getPost2();
        }
        console.log("api result -> ", result);
      }) // console.log("api result -> ", result);
      .catch((error) => console.log("error", error));
    // }, 2000);
  };

  useEffect(() => {
    console.log("Home screen useeffect 1");
    getPost();
    console.log("Home screen useeffect 2", isFocused);
    if (isFocused) {
      console.log("Home screen useeffect 3");
      getPost();
    }
  }, []);

  const getPost = () => {
    //   const [user_id, setUser_id] = useState("");
    //   const [creator_name, setCreator_name] = useState("");
    //   const [topic, setTopic] = useState("");
    //   const [query, setQuery] = useState("");
    //   const [data,setdata]=useState([]);
    // console.log(email, password);

    const url = "https://infocentroid.us/mental-mentor/api/get_all_post";
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("json API data", JSON.stringify(response));
        if (response.data.response === true) {
          setData(response.data.data);
          // console.log(response.data.data);
        } else {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravity(
              "No data available",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
            : null;
        }
      })
      .catch((error) => {
        console.log("Error in api -> ", error);
      })
      //.finally(() => setLoading(false))
      .finally(() => {
        // setTimeout(() => {
        setLoading(false);
        // setLoading.bind(undefined, false)
        // }, 1000);
      });
  };


  const getPost2 = () => {
    //   const [user_id, setUser_id] = useState("");
    //   const [creator_name, setCreator_name] = useState("");
    //   const [topic, setTopic] = useState("");
    //   const [query, setQuery] = useState("");
    //   const [data,setdata]=useState([]);
    // console.log(email, password);
    //               https://infocentroid.us/mental-mentor/api/get_all_post
    const url = "https://infocentroid.us/mental-mentor/api/get_all_post";
    //setLoading(true);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("json API data", JSON.stringify(response));
        if (response.data.response === true) {
          setData(response.data.data);
          // console.log(response.data.data);
        } else {
          Platform.OS === "android"
            ? ToastAndroid.showWithGravity(
              "No data available",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
            : null;
        }
      })
      .catch((error) => {
        console.log("Error in api -> ", error);
      })
      //.finally(() => setLoading(false))
      .finally(() => {
        // setTimeout(() => {
        //setLoading(false);
        // setLoading.bind(undefined, false)
        // }, 1000);
      });
  };

  useEffect(() => {
    console.log("Home screen useeffect 1");
    getPost2();
    console.log("Home screen useeffect 2", isFocused);
    if (isFocused) {
      console.log("Home screen useeffect 3");
      getPost2();
    }
  }, []);

  // const body = {
  //   user_id: "1",
  //   creator_name: creator_name,
  //   topic: topic,
  //   query: query,
  // };
  // const url='https://infocentroid.us/mental-mentor/api/get_all_post'

  // setTimeout(() => {

  //   fetch(url, {
  //     method: "GET",
  //     redirect: "follow",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.response === true) {
  //         //console.log("HI->",result.response.data)
  //         //setdata[result.response.data];
  //         //navigation.navigate("Home");
  //       }
  //       console.log("api result -> ", result);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, 2000);

  const [people, setPeople] = useState([
    { name: "ritu", id: "1" },
    { name: "ritu", id: "2" },
    { name: "ritu", id: "3" },
    { name: "ritu", id: "4" },
    { name: "ritu", id: "5" },
    { name: "ritu", id: "6" },
    { name: "ritu", id: "7" },
    { name: "ritu", id: "8" },
  ]);

  //  useEffect(() => {
  //   getPost()
  //     }, []);

  {
    /*let value=background;
  if(value=='#fff'){
    setBackground('#000')

  }
else{
  setBackground('#fff')
}
*/
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
    activeOpacity={0.7}
    //onPress={this.onFloatinActionClick}
    style={styles.FloatingActionButtonStyle}>
    <Image
     source={{uri:'https://www.techup.co.in/wp-content/uploads/2020/03/ic_cart_image.png' }}   
    style={styles.FloatingActionButtonImageStyle}
    />
  </TouchableOpacity>
  */}

      <Loader loading={loading} />
      <StatusBar backgroundColor={COLORS.whitelight} barStyle='dark-content' />
      <View
        style={{
          height: 56,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
          style={{
            position: "absolute",
            left: 10,
          }}
        >

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/1828/1828859.png",
            }}
            style={{ height: 25, width: 25, marginLeft: 10 }}
          />
        </TouchableOpacity>
        {/*<Text
          style={{
            marginBottom: 20,
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            fontSize: 16,
          }}
        >
          Home page
        </Text>
        */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search")
          }}
          style={{ right: 20, position: "absolute" }}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/*<View style={{ flexDirection: "row", justifyContent: "space-between",}}>
        <View style={styles.btnsecondary}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Search</Text>
          </TouchableOpacity>
        </View>
        </View>*/}

      {/*<TouchableOpacity
        activeOpacity={0.7}
        //onPress={this.onFloatinActionClick}
        onPress={() => navigation.navigate("AddPost")}
        style={styles.FloatingActionButtonStyle}>
        <Image
         source={{uri:'https://www.techup.co.in/wp-content/uploads/2020/03/ic_cart_image.png' }}   
        style={styles.FloatingActionButtonImageStyle}
        />
      </TouchableOpacity>
       */}

      <FlatList
        style={{
          flex: 1,
        }}
        keyExtractor={(item) => item.id}
        data={data}
        // inverted={true}
        renderItem={({ item }) => (
          // item === {}
          <View
            style={{
              //  height: 350,

              width: "95%",
              backgroundColor: COLORS.white,
              elevation: 10,
              margin: 5,
              alignSelf: "center",
              // paddingLeft: 10,
              borderRadius: 10,
              padding: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: COLORS.bluelight,
                  fontSize: 17,
                  marginStart: 10,
                  marginEnd: 10,
                  fontWeight: 'bold'
                }}
              >
                Topic :- {item.topic}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: 15,
                  marginLeft: 20
                }}
              >
                {item.inserted_datetime}
              </Text>
            </View>
            {/*<Text
                style={{
                  color: "#000",
                  fontSize: 16,
                }}
              >
               {item.item.id}
              </Text>
              */}

            <Text
              style={{
                color: "#000",
                fontSize: 15,
                //   marginStart: 10,
                // marginEnd: 10,
                marginHorizontal: 20,
                marginVertical: 5,
              }}
            >
              {item.query}
            </Text>
            <View>
              {
                item.image ?
                  (
                    <Image
                      source={{
                        uri: item.image
                      }}
                      style={{
                        height: 300,
                        width: "95%",
                        alignSelf: 'center',
                        margin: 5
                      }}
                    />
                  ) : null
              }
            </View>
            <View>
              {item.name_visible_status === "1" ? (
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: 16,
                    alignSelf: "flex-end",
                    marginEnd: 10,
                  }}
                >
                  By:-{item.creator_name ? item.creator_name : 'Unknown'}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: "row",
                // width:"100%",
                flex: 1,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  marginStart: 10,
                  alignItems: 'center'
                }}
              >
                {/*<MaterialIcons name="comment" size={18} color={"#000"} />*/}

                {item.likes_count > "0" ? (
                  <Text style={{ fontSize: 16, marginStart: 6, color: COLORS.bluelight }}>
                    {item.likes_count}
                  </Text>
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    like(item.id);
                  }}
                  style={{ flexDirection: 'row' }}
                >
                  <MaterialIcons
                    name="thumb-up"
                    size={18}
                    color={item.likes_count > "0" ? COLORS.bluelight : "#708090"}
                    style={{ marginStart: 5 }}
                  />
                  <Text
                    style={{
                      marginStart: 3,
                      color: item.likes_count > "0" ? COLORS.bluelight : "#708090",
                      fontSize: 13,
                      fontWeight: 'bold'
                    }}
                  >
                    Like
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginStart: "auto",
                  marginEnd: 10,
                  alignItems: 'center'
                }}
              >

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Comment", { item: item.id, query: item.query });
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text style={{
                    marginStart: 5,
                    color: "#708090",
                  }}> {item.comment_count > "0" ? item.comment_count : null}</Text>
                  <MaterialIcons name="comment" size={15} color={"#708090"} />

                  <Text
                    style={{
                      marginStart: 2,
                      color: "#708090",
                    }}
                  >
                    Comment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        //onPress={this.onFloatinActionClick}
        onPress={() => navigation.navigate("AddPost")}
        style={styles.FloatingActionButtonStyle}
      >
        <Image
          // source={{uri:'https://www.techup.co.in/wp-content/uploads/2020/03/ic_cart_image.png' }}
          source={{
            uri: "http://assets.stickpng.com/images/58afdde1829958a978a4a6a6.png",
          }}
          style={styles.FloatingActionButtonImageStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whitelight,
    //  marginTop: StatusBar.currentHeight,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
  btn: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },

  btnsecondary: {
    borderWidth: 1,

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    height: 20,
    width: "20%",
  },

  inputIcon1: {
    marginTop: 220,
    position: "absolute",
    paddingLeft: 205,
    position: "absolute",
  },

  FloatingActionButtonStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.bluelight,
    borderColor: "#000000",
    borderRadius: 200 / 2,
  },

  FloatingActionButtonImageStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
});
