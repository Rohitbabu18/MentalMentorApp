import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image
} from "react-native";
import COLORS from "../../consts/color";
import { MaterialIcons } from "@expo/vector-icons";

const SearchScreen = ({ navigation }) => {
  const [Text1, setText] = useState();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  //   useEffect(() => {
  //     console.log("useeFFEXCT CALLED ");
  //   }, [data]);

  const double = (Text1) => {
    // console.log(email, password);

    const url = "https://infocentroid.us/mental-mentor/api/search_topic";

    const params = new FormData();
    params.append("str", Text1);

    fetch(url, {
      method: "POST",
      body: params,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response === true) {
          //navigation.navigate("Drawer");
          //console.log("api Sucess->");
          //   console.log("url  -> ", url + "  >>body -> " + JSON.stringify(result.response));
          console.log("api result -> ", result.data);

          setData(result.data); // Gourav Sir
          setData[result.data]; // Ritu Mam
        }
      })
      .catch((error) => console.log("error", error));

  };

  // id - gourava1
  // pass - Expo@1234


  const renderItem = ({ item }) => {
    console.log("item of flatlist", item);
    return (
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
              disabled
              // onPress={() => {
              //   like(item.id);
              // }}
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
              // onPress={() => {
              //   navigation.navigate("Comment", { item: item.id, query: item.query });
              // }}
              disabled
              style={{ flexDirection: 'row' }}
            >
              <Text>{item.comment_count > "0" ? item.comment_count : null}</Text>
              <MaterialIcons name="comment" size={18} color={"#708090"} />

              <Text
                style={{
                  marginStart: 5,
                  color: "#708090",
                }}
              >
                Comment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.whitelight,
        flex: 1,
        // marginTop: StatusBar.currentHeight,
      }} >

      <StatusBar backgroundColor={COLORS.bluelight} barStyle='light-content' />
      <View
        style={{
          height: 80,
          width: "100%",
          alignItems: "center",
          backgroundColor: COLORS.bluelight,
          flexDirection: "row",
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginStart: 20,
            color: COLORS.white
          }}>
          Search here
        </Text>
      </View>

      { /*<View style={{ marginTop: 100, flexDirection: "row" }}>*/}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="search here..."
          onChangeText={(e) => {
            setText(e);
          }}
          style={styles.input}
        />
      </View>

      {/* <View style={styles.btnsecondary}>
          <TouchableOpacity onPress={() => double(Text1)}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: COLORS.white }}
            >Search
            </Text>
          </TouchableOpacity>
          </View>*/}
      {/*</View>*/}




      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => double(Text1)}
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          alignSelf: "center",
          backgroundColor: COLORS.bluelight,
          height: 50,
          borderRadius: 30
        }}
      >
        <Text style={{ fontSize: 18, color: COLORS.white }}>Search</Text>
      </TouchableOpacity>
      <View
        style={{
          //  flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={renderItem}
          style={{ marginVertical: 10 }}
        />
      </View>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100 %",
  },

  input: {
    width: "100%",
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    flex: 15,
    fontSize: 18,
    padding: 10,
    marginLeft: 10,
  },


});
