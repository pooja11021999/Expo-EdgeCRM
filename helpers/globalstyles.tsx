import { ColorPalette } from "@/constants/Colors";
import { StyleSheet, TextStyle } from "react-native";
import { scale } from "react-native-size-matters";

export const textStyle = (
  textColor: string = ColorPalette.black,
  fontSize: number = scale(16)
): TextStyle => ({
  fontFamily: "Roboto_400Regular",
  color: textColor,
  fontSize,
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageText: {
    color: ColorPalette.red,
    fontSize: scale(13),
  },
});
