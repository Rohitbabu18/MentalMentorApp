import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Modal,
    StatusBar,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import COLORS from '../../consts/color';
import { Entypo } from "@expo/vector-icons";
import Loader from '../utils/Loader';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from '../../styles';
export default function ProfileScreen(props) {
    const [loading, setLoading] = useState(false);
    const [user_id, setUserid] = useState();

    const [acname, setAcName] = useState();
    const [acemail, setAcEmail] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const getUserFromStorage = async () => {
        try {
            // setQuotes(AsyncStorage.getItem("quote_id"));
            // console.log("quotes_id ->", quotes);

            await AsyncStorage.getItem("id", (err, value) => {
                if (err) {
                } else {
                    if (value !== null) {
                        setUserid(value);
                        console.log("id ->", value);
                    }
                }
            });

            await AsyncStorage.getItem("name", (err, value) => {
                if (err) {
                } else {
                    if (value !== null) {
                        setAcName(value);

                        console.log("quotes_id ->", value);
                    }
                }
            });
            await AsyncStorage.getItem("email", (err, value) => {
                if (err) {
                } else {
                    if (value !== null) {
                        setAcEmail(value);

                        console.log("quotes_id ->", value);
                    }
                }
            });
            await AsyncStorage.getItem("password", (err, value) => {
                if (err) {
                } else {
                    if (value !== null) {
                        setPassword(value);

                        console.log("quotes_id ->", value);
                    }
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }



    function update() {
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
            const url = "https://infocentroid.us/mental-mentor/api/updateprofile";
            const params = new FormData();
            params.append("user_id", user_id)
            params.append("name", name);
            params.append("email", email);
            params.append("password", password);
            setLoading(true);
            fetch(url, {
                method: "POST",
                body: params,
                redirect: "follow",
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.response === true) {
                        AsyncStorage.getItem('name')
                            .then((data) => {
                                data = name
                                AsyncStorage.setItem('name', JSON.stringify(data));
                            }).done();
                        AsyncStorage.getItem('email')
                            .then((data) => {
                                data = email
                                AsyncStorage.setItem('email', JSON.stringify(data));
                            }).done();
                        AsyncStorage.getItem('password')
                            .then((data) => {
                                data = password
                                AsyncStorage.setItem('password', JSON.stringify(data));
                            }).done();
                        setLoading(false);
                    }
                    console.log("api result in profile update-> ", result);
                })
                .catch((error) => console.log("error", error))
                .finally(() => {

                    getUserFromStorage();
                    setLoading(false);

                });

        }
    }
    // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    useEffect(() => {
        getUserFromStorage();
    }, [])
    return (
        <SafeAreaView style={styles.container}>

            <Loader loading={loading} />
            <StatusBar backgroundColor={COLORS.bluelight} barStyle='light-content' />
            <ScrollView>
                <View style={styles.headerview}>
                    <Text style={styles.headtext}>User Profile</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ ...styles.headertext, color: COLORS.white }}>Name : </Text>
                        <Text style={styles.textvalue}>{acname}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ ...styles.headertext, color: COLORS.white }}>Email : </Text>
                        <Text style={styles.textvalue}>{acemail}</Text>
                    </View>

                </View>
                <Text style={styles.editbutton}>Edit Profile</Text>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.headertext}>Name :        </Text>

                        <TextInput
                            placeholder="name"
                            value={name}
                            onChangeText={(e) => {
                                setName(e);
                            }}
                            style={styles.inputstyle}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.headertext}>Email :         </Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(e) => {
                                setEmail(e);
                            }}
                            keyboardType="email-address"
                            style={styles.inputstyle}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.headertext}>password : </Text>
                        <TextInput
                            placeholder="Password"
                            onChangeText={(e) => {
                                setPassword(e);
                            }}
                            secureTextEntry={true}
                            keyboardType="visible-password"
                            style={styles.inputstyle}
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        update();
                        // navigation.openDrawer()
                    }}
                >
                    <View style={{ ...Styles.btnPrimary, marginHorizontal: 30, borderRadius: 30 }}>
                        <Text
                            style={{
                                color: COLORS.white,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            Update
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    inputstyle: {
        marginLeft: 20,
        marginTop: 5
    },
    editview: {
        margin: 20,
    },
    editbutton: {
        color: COLORS.bluelight,
        fontSize: 18,
        fontWeight: 'bold',
        margin: 30
    },
    textvalue: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white
    },
    headertext: {
        marginLeft: 20,
        fontSize: 15,
        color: COLORS.gray
    },
    headtext: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
    },
    headerview: {
        height: 300,
        backgroundColor: COLORS.bluelight,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.whitelight
    }
});