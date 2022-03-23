import { StyleSheet } from "react-native";
import COLORS from "../consts/color";

const Styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  inputIcon: {
    marginTop: 15,
    position: "absolute",
  },
  input: {
    color: COLORS.light,
    paddingLeft: 30,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    height: 40,
    padding: 7,
    borderRadius: 5,
  },

  btnPrimary: {
    backgroundColor: COLORS.primary,
    height: 50,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  line: {
    height: 1,
    width: "42%",
    marginHorizontal: 10,
    backgroundColor: COLORS.light,
  },
  btnsecondary: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.light,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
  },
  btnImage: {
    width: 25,
    height: 25,

    marginEnd: 5,
  },
  // btnPrimary2:{
  //      backgroundColor:COLORS.primary,
  //         height:50,

  //         justifyContent:'center',
  //         alignItems:'center',
  //         borderRadius:5,

  // }
});
export default Styles;
