import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar
} from "react-native";
import COLORS from "../../consts/color";

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
          width: "90%",
          backgroundColor: "#fff",
          elevation: 10,
          margin: 5,
          alignSelf: "center",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            //           navigation.navigate("ViewProductsDetails", { item }) ;
          }}
        >
          <Text style={{ fontSize: 10, padding: 5, }}>query:-{item.query}</Text>
          <Text style={{ fontSize: 10, padding: 5 }}>creator_name:-{item.creator_name}</Text>
          <Text style={{ fontSize: 10, padding: 5 }}>id:-{item.user_id}</Text>
          <Text style={{ fontSize: 10, padding: 5 }}>topic:-{item.topic}</Text>
        </TouchableOpacity>
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




      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          alignSelf: "center",
          padding: 10,
          marginRight: 80,
          height: 90
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={() => {
          //   Post();
          // }}
          onPress={() => double(Text1)}
          style={[styles.btnsecondary, { backgroundColor: COLORS.bluelight }]}
        >
          <Text style={{ fontSize: 18, color: COLORS.white }}>Search</Text>
        </TouchableOpacity>
      </View>
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

  btnsecondary: {
    borderWidth: 1,
    width: "25%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
    marginStart: 60,
    backgroundColor: COLORS.bluelight,
  },
});
