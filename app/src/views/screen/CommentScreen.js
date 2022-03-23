import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../../consts/color";
import Loader from "../utils/Loader";

const CommentScreen = ({ route, navigation }) => {
  let { query } = route.params;
  const [userId, setUserId] = useState("");

  const [post_id, setPost_id] = useState("");
  const [commentor_name, setCommentor_name] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(email, password);

  useEffect(() => {
    let { item } = route.params;
    console.log("post id -> ", item);
    setPost_id(item);
    getUserFromStorage();
    get(item);
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
          } else {
            setUserId("");
          }
        }
      });
    } catch (error) {
      console.log("Error in getting user from storage -> ", error);
    }
  };

  const get = (id) => {
    const url = "https://infocentroid.us/mental-mentor/api/get_comments";

    const params = new FormData();
    params.append("post_id", id);

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

  };

  const Post = () => {
    const body = {
      user_id: "1",
      post_id: "1",
      commentor_name: commentor_name,
      comment: comment,
    };
    setLoading(true);
    const url = "https://infocentroid.us/mental-mentor/api/add_comment";

    const params = new FormData();
    params.append("user_id", userId);
    params.append("post_id", post_id);
    params.append("commentor_name", commentor_name);
    params.append("comment", comment);

    if (checked) {
      params.append("name_visible_status", "1");
    } else {
      params.append("name_visible_status", "0");
    }

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
            // navigation.navigate("Drawer");
            setData(result.data);
            setShow(true);
            setComment("");
            get(post_id);
          }
          console.log("api result -> ", result.data);
        }) // console.log("api result -> ", result);
        .catch((error) => console.log("error", error));
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.whitelight,
        flex: 1,
        //marginTop: StatusBar.currentHeight,
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
          Comment on -
        </Text>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{query}</Text>

      </View>
      {/*<View
        style={{
          backgroundColor: 'white',
       
          borderRadius: 25,
          elevation: 2,
         
        }}>
        <TextInput
         
         
          style={{height: '100%', paddingHorizontal: 10, fontSize: 18}}
          multiline
          placeholder="Enter message..."
        />
      </View>

      <TouchableOpacity>
       
       <Text>POST</Text>
      </TouchableOpacity>
      */}

      {/*<View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <TextInput
            placeholder="Enter your name"
            onChangeText={(e) => {
              setCommentor_name(e);
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

      {/* <View
          style={{
            marginTop: 15,
            width: "auto",
          }}
        >
          <CheckBox
            title="Show My Name"
            checked={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
          */}

      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          alignSelf: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Post();
          }}
          style={[styles.btnsecondary, { backgroundColor: COLORS.primary }]}
        >
          <Text style={{ fontSize: 18, color: COLORS.white }}>Post</Text>
        </TouchableOpacity>
      </View>
        */}

      <FlatList
        style={{
          flex: 1,
          marginTop: 56,
          // width:Dimensions.get('window').width,
          // height:Dimensions.get('window').height-200,
          // position:'absolute',
          bottom: 56,
          // top:60
          // alignSelf:'center'
        }}
        keyExtractor={(item) => item.id}
        data={commentData}
        ListEmptyComponent={() => (
          <View style={{ alignSelf: 'center' }}>
            <Text>No comments yet...</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              //elevation: 10,
              elevation: 10,
              margin: 5,
              alignSelf: "center",

              borderRadius: 10,
              padding: 5,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                marginStart: 10,
                marginEnd: 10,
              }}
            >
              {item.comment}
            </Text>

            <Text
              style={{
                color: "#a9a9a9",
                fontSize: 14,
                alignSelf: "flex-end",
                marginEnd: 10,
              }}
            >
              {item.inserted_datetime}
            </Text>
          </View>
        )}
      />
      {/* <TouchableOpacity
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
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                justifyContent: "center",
                alignItems: "center",
                color: COLORS.white,
              }}
            >
              Post
            </Text>
          </View>
        </View>
      </TouchableOpacity>
            */}
      {show ? (
        <>
          <Text
            style={{
              color: "#a9a9a9",
              fontSize: 16,
              marginEnd: 10,
            }}
          >
            {/*Comment :-{data?.comment}*/}
          </Text>
          {data?.name_visible_status === "1" ? (
            <Text
              style={{
                color: "#a9a9a9",
                fontSize: 16,
                alignSelf: "flex-end",
                marginEnd: 140,
              }}
            >
              {/*Commentor Name:-{data?.commentor_name}*/}
            </Text>
          ) : null}
        </>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: 'center',
          backgroundColor: "#CCe5FF",
          width: "95%",
          alignSelf: "center",
          position: "absolute",
          bottom: 10,
          borderRadius: 10
        }}
      >
        <TextInput
          placeholder="Comment here..."
          onChangeText={(e) => {
            setComment(e);
          }}
          keyboardType="default"
          multiline={true}
          style={{
            paddingLeft: 15,
            flex: 1,
            fontSize: 16,
            height: 55,
          }}
          value={comment}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Post();
          }}
        >
          <Text
            style={{
              marginRight: 20,
              fontSize: 18,
              color: COLORS.bluelight,
            }}
          >
            POST
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  inputContainer: {
    // marginTop: 20,
    // padding: 10,
    margin: 10,
  },

  // input:{
  //    color:'#000',
  //     paddingLeft:30,
  //     borderBottomWidth:0.5,
  //     flex:1,
  //     fontSize:18,
  //     margin:90,
  //     borderRadius:10
  // },
  input: {
    color: COLORS.light,
    paddingLeft: 30,
    borderBottomWidth: 0.5,

    fontSize: 18,
    borderWidth: 1,
    height: 40,
    padding: 7,
    borderRadius: 5,
  },
  btnsecondary: {
    height: 50,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginLeft: 10,
  },
});
