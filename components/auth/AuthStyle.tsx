import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const AuthStyle = StyleSheet.create({
  AuthContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: scale(20),
    paddingRight: scale(20),
  },
  input: {
    height: scale(40),
    borderWidth: scale(0),
    borderColor: "#ccc",
    borderBottomWidth: scale(1),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
    marginTop: scale(15),
    fontSize: scale(18),
    ...textStyle(),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  errorInput: {
    borderColor: "red",
  },
  toastTextStyle: {
    ...textStyle(ColorPalette.white, scale(14)),
  },
});
